import PageHeader from "@/components/ui/PageHeader";
import { getCartProducts } from "@/lib/product";
import React from "react";
import Image from "next/image";
import {
  AddToCartIcon,
  RemoveCartButton,
} from "../products/_components/ProductActions";

const CartPage = async () => {
  const cartProducts = await getCartProducts("1");
  return (
    <div>
      <PageHeader title="Your Cart" />
      <div className="flex my-8 flex-col md:flex-row ">
        <div className="md:w-3/4 w-full flex flex-col gap-4">
          <div className="w-full min-w-full flex justify-between items-center">
            <div>Item</div>
            <div className="flex justify-between items-center gap-16 md:gap-32">
              <div>Qty</div>
              <div>Total</div>
            </div>
          </div>
          <hr />
          {cartProducts.map((cartItem) => (
            <React.Fragment key={cartItem.id}>
              <div className="w-full min-w-full flex justify-between items-center gap-4 md:gap-10 ">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 h-16 w-12 flex items-center md:w-16 rounded-lg ">
                    <Image
                      src={cartItem.product.imagePath}
                      alt="Product Image"
                      className="rounded"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold tex-xs">{cartItem.product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {cartItem.product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0 md:gap-10">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button className="px-1 md:px-2 py-1 text-gray-500 hover:bg-gray-100">
                      <RemoveCartButton
                        id={cartItem.product.id}
                      ></RemoveCartButton>
                    </button>
                    <span className="px-4 text-center w-8">{cartItem.quantity}</span>
                    <button className=" px-1 md:px-2 py-1 text-gray-500 hover:bg-gray-100">
                      <AddToCartIcon id={cartItem.product.id}></AddToCartIcon>
                    </button>
                  </div>
                  <p className="font-semibold w-20 text-right text-sm">
                    ${(cartItem.product.priceInCents / 100).toFixed(2)}
                  </p>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
        <div className=" w-full md:w-1/4 flex justify-center">Summary</div>
      </div>
    </div>
  );
};

export default CartPage;
