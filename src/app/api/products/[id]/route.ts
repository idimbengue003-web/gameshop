import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// PUT /api/products/[id] — mise à jour (admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        description: body.description ?? existing.description,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        oldPrice:
          body.oldPrice !== undefined
            ? body.oldPrice
              ? Number(body.oldPrice)
              : null
            : existing.oldPrice,
        category: body.category ?? existing.category,
        game: body.game !== undefined ? body.game || null : existing.game,
        emoji: body.emoji ?? existing.emoji,
        badge: body.badge !== undefined ? body.badge || null : existing.badge,
        popular:
          body.popular !== undefined ? Boolean(body.popular) : existing.popular,
        instantDelivery:
          body.instantDelivery !== undefined
            ? Boolean(body.instantDelivery)
            : existing.instantDelivery,
        useUniqueCodes:
          body.useUniqueCodes !== undefined
            ? Boolean(body.useUniqueCodes)
            : existing.useUniqueCodes,
        deliveryContent:
          body.deliveryContent !== undefined
            ? body.deliveryContent || null
            : existing.deliveryContent,
        deliveryTime:
          body.deliveryTime !== undefined
            ? body.deliveryTime || null
            : existing.deliveryTime,
        stock: body.stock !== undefined ? Number(body.stock) : existing.stock,
        active:
          body.active !== undefined ? Boolean(body.active) : existing.active,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Erreur PUT /api/products/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] — suppression (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE /api/products/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
