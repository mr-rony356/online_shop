import PageHeader from "@/components/ui/PageHeader";
import { getCartProducts } from "@/lib/product";
import React from "react";
import Image from "next/image";
import {
  AddToCartIcon,
  RemoveFromCartButton,
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
                  <div className="bg-gray-100 h-16 min-w-16 flex items-center md:w-16 rounded-lg ">
                    <Image
                      src={cartItem.product.imagePath}
                      alt="Product Image"
                      className="rounded"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold tex-xs">
                      {cartItem.product.name}
                    </h3>
                    <p className="text-gray-500 text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-24 sm:max-w-72">
                      {cartItem.product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0 md:gap-14">
                  <div className="flex items-center border justify-center border-gray-300 rounded">
                    <RemoveFromCartButton
                      id={cartItem.product.id}
                    ></RemoveFromCartButton>
                    <span className=" md:px-4 text-center w-6 md:w-8">
                      {cartItem.quantity}
                    </span>
                    <AddToCartIcon id={cartItem.product.id}></AddToCartIcon>
                  </div>
                  <p className="font-semibold w-20 text-right text-sm">
                    ${" "}
                    {(
                      (cartItem.product.priceInCents / 100) *
                      cartItem.quantity
                    ).toFixed(2)}
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
