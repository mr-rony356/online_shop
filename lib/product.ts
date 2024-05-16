// lib/products.ts
import db from "@/db/db";

export async function getPopularProducts() {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

export async function getNewetProducts() {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}