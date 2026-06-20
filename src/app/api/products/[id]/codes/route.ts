import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products/[id]/codes — liste les codes (admin)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    // Sécurité basique : si pas admin, on ne renvoie rien
    if (admin !== "true") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const codes = await db.codeItem.findMany({
      where: { productId: id },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      include: {
        order: {
          select: { ref: true, createdAt: true, customerName: true },
        },
      },
    });

    return NextResponse.json({ codes });
  } catch (error) {
    console.error("Erreur GET codes:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/products/[id]/codes — ajouter des codes (admin)
// Body: { codes: string[] }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const codes: string[] = body.codes || [];

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json(
        { error: "codes (string[]) requis" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    // Activer useUniqueCodes automatiquement
    const created = await db.$transaction(
      codes
        .filter((c) => c.trim().length > 0)
        .map((content) =>
          db.codeItem.create({
            data: { productId: id, content: content.trim(), status: "available" },
          })
        )
    );

    // Mettre à jour le stock + flag useUniqueCodes
    const available = await db.codeItem.count({
      where: { productId: id, status: "available" },
    });
    await db.product.update({
      where: { id },
      data: { useUniqueCodes: true, stock: available },
    });

    return NextResponse.json({
      added: created.length,
      totalAvailable: available,
    });
  } catch (error) {
    console.error("Erreur POST codes:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/products/[id]/codes?codeId=xxx — supprimer un code (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const codeId = searchParams.get("codeId");

    if (!codeId) {
      return NextResponse.json({ error: "codeId requis" }, { status: 400 });
    }

    const code = await db.codeItem.findUnique({ where: { id: codeId } });
    if (!code || code.productId !== id) {
      return NextResponse.json({ error: "Code introuvable" }, { status: 404 });
    }

    if (code.status === "sold") {
      return NextResponse.json(
        { error: "Impossible de supprimer un code déjà vendu" },
        { status: 400 }
      );
    }

    await db.codeItem.delete({ where: { id: codeId } });

    // Recalculer le stock
    const available = await db.codeItem.count({
      where: { productId: id, status: "available" },
    });
    await db.product.update({ where: { id }, data: { stock: available } });

    return NextResponse.json({ success: true, totalAvailable: available });
  } catch (error) {
    console.error("Erreur DELETE code:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
