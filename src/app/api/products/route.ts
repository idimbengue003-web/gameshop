import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products — liste publique (uniquement actifs)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    // Vérifier que la DB est configurée
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
      return NextResponse.json(
        {
          products: [],
          error: "DB_NOT_CONFIGURED",
          message:
            "Base de données non configurée. Voir README pour configurer DATABASE_URL.",
        },
        { status: 200 }
      );
    }

    const products = await db.product.findMany({
      where: admin === "true" ? {} : { active: true },
      orderBy: [{ popular: "desc" }, { createdAt: "asc" }],
    });

    // Pour les produits à codes uniques, recalculer le stock réel côté serveur
    const enriched = await Promise.all(
      products.map(async (p) => {
        if (p.useUniqueCodes) {
          const available = await db.codeItem.count({
            where: { productId: p.id, status: "available" },
          });
          return { ...p, stock: available };
        }
        return p;
      })
    );

    return NextResponse.json({ products: enriched });
  } catch (error) {
    console.error("Erreur GET /api/products:", error);
    return NextResponse.json(
      { products: [], error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

// POST /api/products — création (admin)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
        useUniqueCodes: Boolean(body.useUniqueCodes),
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
