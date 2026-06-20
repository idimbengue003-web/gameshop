import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/admin/stats — statistiques dashboard
export async function GET() {
  try {
    const [
      totalProducts,
      activeProducts,
      totalCodes,
      availableCodes,
      soldCodes,
      totalOrders,
      deliveredOrders,
      pendingOrders,
      recentOrders,
    ] = await Promise.all([
      db.product.count(),
      db.product.count({ where: { active: true } }),
      db.codeItem.count(),
      db.codeItem.count({ where: { status: "available" } }),
      db.codeItem.count({ where: { status: "sold" } }),
      db.order.count(),
      db.order.count({ where: { status: "delivered" } }),
      db.order.count({ where: { status: "pending" } }),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          product: { select: { name: true, emoji: true } },
        },
      }),
    ]);

    // CA total (commandes livrées)
    const revenueAgg = await db.order.aggregate({
      where: { status: "delivered" },
      _sum: { amount: true },
    });

    // Stock faible (produits codes uniques avec < 3 codes dispo)
    const lowStockProducts = await db.product.findMany({
      where: { useUniqueCodes: true, active: true },
      include: {
        codes: {
          where: { status: "available" },
          select: { id: true },
        },
      },
    });
    const lowStock = lowStockProducts
      .filter((p) => p.codes.length < 3)
      .map((p) => ({
        id: p.id,
        name: p.name,
        emoji: p.emoji,
        available: p.codes.length,
      }));

    return NextResponse.json({
      products: { total: totalProducts, active: activeProducts },
      codes: {
        total: totalCodes,
        available: availableCodes,
        sold: soldCodes,
      },
      orders: {
        total: totalOrders,
        delivered: deliveredOrders,
        pending: pendingOrders,
        revenue: revenueAgg._sum.amount ?? 0,
      },
      recentOrders: recentOrders.map((o) => ({
        ref: o.ref,
        amount: o.amount,
        status: o.status,
        createdAt: o.createdAt,
        productName: o.product.name,
        productEmoji: o.product.emoji,
        customerName: o.customerName,
      })),
      lowStock,
    });
  } catch (error) {
    console.error("Erreur GET /api/admin/stats:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
