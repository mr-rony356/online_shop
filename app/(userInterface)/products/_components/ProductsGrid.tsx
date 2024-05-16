// app/products/_components/ProductsGrid.tsx
import PageHeader from "@/components/ui/PageHeader";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductgridProps {
  products: Product[];
  title: string;
}

const ProductsGrid = ({ products, title }: ProductgridProps) => {
  return (
    <div>
      <div className="flex gap-4 items-center ">
        <PageHeader title={title} />
        <Link href="/products" className="flex items-center cursor-pointer gap-1 text-sm">
          View All <ArrowRight className="size-4"></ArrowRight>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-8 gap-8 ">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col justify-evenly gap-2 border-2 border-gray-100 rounded-lg p-4 transform transition-transform hover:scale-105 cursor-pointer">
            <div className="bg-gray-100 p-4 min-h-40 flex flex-col items-center justify-center max-h-40 rounded-lg">
              <Image src={product.imagePath} width={150} height={100} alt={product.name} />
            </div>
            <h1>{product.name}</h1>
            <p className="font-bold text-orange-600"> {formatCurrency(product.priceInCents / 100)} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;