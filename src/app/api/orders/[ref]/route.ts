import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/orders/[ref] — suivi commande par référence
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;

    const order = await db.order.findUnique({
      where: { ref },
      include: {
        product: {
          select: {
            name: true,
            emoji: true,
            game: true,
            category: true,
            instantDelivery: true,
            deliveryTime: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande introuvable. Vérifiez votre référence." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: {
        ref: order.ref,
        status: order.status,
        amount: order.amount,
        customerName: order.customerName,
        playerId: order.playerId,
        waveTxId: order.waveTxId,
        createdAt: order.createdAt,
        deliveredContent: order.deliveredContent,
        product: order.product,
      },
    });
  } catch (error) {
    console.error("Erreur GET /api/orders/[ref]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
