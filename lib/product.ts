import db from "@/db/db";
import { cache } from "./cache";

export const getMostPopularProducts = async () => {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
};
export const getNewestProducts = async () => {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
};
export const getCartProducts =cache(  async (userId: string) => {
  return await db.cart.findMany({
    where: {
      userId,
      
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
    include: {
      product: true, // This will include the associated Product data
    },
  });
},
["/carts", "getCartProducts"],
{
  revalidate:false,
})
