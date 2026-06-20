import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/admin/orders — liste des commandes (admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 50);
    const status = searchParams.get("status");

    const orders = await db.order.findMany({
      where: status ? { status } : {},
      include: {
        product: {
          select: { name: true, emoji: true, game: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: Math.min(limit, 200),
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Erreur GET /api/admin/orders:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
