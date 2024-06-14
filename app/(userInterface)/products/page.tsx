import PageHeader from "@/components/ui/PageHeader";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import { AddToCartButton } from "./_components/ProductActions";
// import { createUser } from "@/app/admin/_actions/products";

const ProductPage = async () => {
  const products = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "asc" } },
  });

  // const cart =await db.cart.findMany({
  //   where: {
  //      userId: '666c8e87a4f6915aa99e7cb5',
  //    }
  //  });
  //  const user=await db.user.findMany({
  // });
  // // console.log('user',user)
  // createUser('rony@gmail.com');
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Products" />
        <div>Sort by</div>
      </div>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 my-8 gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-evenly gap-2 border-2 border-gray-100 rounded-lg p-4 transition-transform transform cursor-pointer"
          >
            <div className="bg-gray-100 p-4 min-h-36 md:min-h-48 flex flex-col items-center justify-center max-h-48 rounded-lg ">
              <Image
                className="hover:scale-125 transition-transform transform "
                src={product.imagePath}
                width={150}
                height={100}
                alt={product.name}
              />
            </div>
            <h1>{product.name}</h1>
            <p className="font-bold text-orange-600">
              {" "}
              {formatCurrency(product.priceInCents / 100)}{" "}
            </p>
            <AddToCartButton id={product.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
