import SpecialProductCarousel from "./components/SpecialProducts";
import PageHeader from "../../components/ui/PageHeader";
import CategoryCard from "./components/CategoryCard";
import db from "@/db/db";
import Link from "next/link";
import ProductsGrid from './products/_components/ProductsGrid';

function getPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

function getNewetProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

const SkeletonProductsGrid = () => {
  return (
    <div>
      <div className="flex gap-4 items-center ">
        <h1 className="text-2xl font-bold"></h1>
        <Link href="/products" className="flex items-center cursor-pointer gap-1 text-sm">
          {' '}
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-8 gap-8 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-evenly gap-2 border-2 border-gray-100 rounded-lg p-4 transform transition-transform hover:scale-105 cursor-pointer animate-pulse"
          >
            <div className="bg-gray-200 p-4 min-h-40 flex flex-col items-center justify-center max-h-40 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <main className="flex flex-col gap-16 ">
      <SpecialProductCarousel />
      <div>
        <PageHeader title="Categories" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-8">
          <CategoryCard name="T-shirt" image="/men_clothes.svg" />
          <CategoryCard name="Mobiles" image="/mobile.svg" />
          <CategoryCard name="Laptops" image="/laptop.svg" />
          <CategoryCard name="Headphones" image="/headphones.svg" />
          <CategoryCard name="Watchs" image="/watche.svg" />
          <CategoryCard name="Coming Soon" image="/men_clothes.svg" />
        </div>
      </div>
      <ProductsGrid fetchProduct={getPopularProducts} title="Most Popular" />
      <ProductsGrid fetchProduct={getNewetProducts} title="Newest" />
    </main>
  );
}