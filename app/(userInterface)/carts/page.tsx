import PageHeader from "@/components/ui/PageHeader";
import { getCartProducts } from "@/lib/product";
import React from "react";
import Image from "next/image";
import { AddToCartIcon, RemoveCartButton } from "../products/_components/ProductActions";
interface CartProduct {
  id: string;
  name: string;
  description: string; // Add this line if the description is included in the query
  priceInCents: number;
  imagePath: string;
  quantity: number;
}
const CartPage = async () => {
  const cartProducts = await getCartProducts("1");
console.log(cartProducts)
  return (
    <div>
      <PageHeader title="Your Cart" />
      <div className="flex my-8">
        <div className="w-3/4 flex flex-col gap-4">
          <div className="w-full min-w-full flex justify-between items-center">
            <div>Item</div>
            <div className="flex justify-between items-center gap-32">
              <div>Qty</div>
              <div>Total</div>
            </div>
          </div>
          <hr />
          {cartProducts.map((cartItem) => (
            <React.Fragment key={cartItem.id}>
              <div className="w-full min-w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={cartItem.product.imagePath}
                    alt="Product Image"
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="font-semibold">{cartItem.product.name}</h3>
                    <p className="text-gray-500">{cartItem.product.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-16">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button className="px-2 py-1 text-gray-500 hover:bg-gray-100">
                      <RemoveCartButton id={cartItem.product.id}></RemoveCartButton>
                    </button>
                    <span className="px-4">{cartItem.quantity}</span>
                    <button className="px-2 py-1 text-gray-500 hover:bg-gray-100">
                      <AddToCartIcon id={cartItem.product.id}></AddToCartIcon>
                    </button>
                  </div>
                  <p className="font-semibold">
                    ${(cartItem.product.priceInCents / 100).toFixed(2)}
                  </p>
                </div>
              </div>
              <hr className="" />
            </React.Fragment>
          ))}
        </div>
        <div className="w-1/4 flex justify-center ">Summary</div>
      </div>
    </div>
  );
};

export default CartPage;