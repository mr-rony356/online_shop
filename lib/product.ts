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
    include: {
      product: true, // This will include the associated Product data
    },
  });
},
["/carts", "getCartProducts"],
{
  revalidate:false,
})
export const getCartQuantity = cache(
  async (userId: string) => {
    const totalQuantity = await db.cart.aggregate({
      where: {
        userId,
      },
      _sum: {
        quantity: true,
      },
    });

    return totalQuantity._sum.quantity || 0;
  },
  ["/", "/carts", "/products","getCartQuantity"],
  { revalidate: false }  // Disable caching for this function
);
