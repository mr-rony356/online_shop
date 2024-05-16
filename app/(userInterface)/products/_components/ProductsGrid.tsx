import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
interface ProductgridProps {
  fetchProduct: () => Promise<Product[]>;
}
const ProductsGrid = async ({ fetchProduct }: ProductgridProps) => {
  return (
    <div className="grid grid-cols-2 m:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-8">
      {(await fetchProduct()).map((product) => (
        <div key={product.id} className="flex flex-col justify-between gap-2">
          <Image className="max-h-36 min-h-28"
            src={product.imagePath}
            width={150}
            height={30}
            alt={product.name}
          />
          <h1>{product.name}</h1>
          <p className="font-bold text-orange-500">{formatCurrency(product.priceInCents)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
