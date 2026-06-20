import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products — liste publique (uniquement actifs)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    const products = await db.product.findMany({
      where: admin === "true" ? {} : { active: true },
      orderBy: [{ popular: "desc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Erreur GET /api/products:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

// POST /api/products — création (admin)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation minimale
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Champs requis manquants: name, price, category" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price),
        oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
        category: body.category,
        game: body.game || null,
        emoji: body.emoji || "🎮",
        badge: body.badge || null,
        popular: Boolean(body.popular),
        instantDelivery: Boolean(body.instantDelivery),
        deliveryContent: body.deliveryContent || null,
        deliveryTime: body.deliveryTime || null,
        stock: body.stock ? Number(body.stock) : 0,
        active: body.active !== false,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/products:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
