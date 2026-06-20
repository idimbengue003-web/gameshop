import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/orders — créer une commande (appelé par "J'ai payé")
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, customerName, customerPhone, playerId, waveTxId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "productId requis" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product || !product.active) {
      return NextResponse.json(
        { error: "Produit introuvable ou inactif" },
        { status: 404 }
      );
    }

    // Vérifier stock dispo si codes uniques
    let availableCode: { id: string; content: string } | null = null;
    if (product.useUniqueCodes) {
      availableCode = await db.codeItem.findFirst({
        where: { productId: product.id, status: "available" },
        orderBy: { createdAt: "asc" },
      });
      if (!availableCode) {
        return NextResponse.json(
          {
            error: "stock_empty",
            message:
              "Stock épuisé pour ce produit. Contactez-nous sur Instagram @game_shop221.",
          },
          { status: 409 }
        );
      }
    }

    // Générer une référence unique
    const ref = `CMD-${product.id.slice(-4).toUpperCase()}-${Date.now().toString().slice(-6)}`;

    // Déterminer le contenu livré
    let deliveredContent: string | null = null;
    let deliveredCodeId: string | null = null;

    if (product.instantDelivery) {
      if (product.useUniqueCodes && availableCode) {
        deliveredContent = availableCode.content;
        deliveredCodeId = availableCode.id;
      } else if (product.deliveryContent) {
        deliveredContent = product.deliveryContent;
      }
    }

    // Créer la commande + réserver le code si applicable
    const order = await db.order.create({
      data: {
        ref,
        productId: product.id,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        playerId: playerId || null,
        waveTxId: waveTxId || null,
        amount: product.price,
        status: product.instantDelivery ? "delivered" : "pending",
        deliveredContent,
        deliveredCodeId,
      },
    });

    // Marquer le code comme vendu
    if (availableCode) {
      await db.codeItem.update({
        where: { id: availableCode.id },
        data: {
          status: "sold",
          orderId: order.id,
          soldAt: new Date(),
        },
      });

      // Mettre à jour le compteur de stock du produit
      const remaining = await db.codeItem.count({
        where: { productId: product.id, status: "available" },
      });
      await db.product.update({
        where: { id: product.id },
        data: { stock: remaining },
      });
    }

    return NextResponse.json({
      order: {
        ref: order.ref,
        status: order.status,
        amount: order.amount,
        deliveredContent: order.deliveredContent,
        deliveredAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur POST /api/orders:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
