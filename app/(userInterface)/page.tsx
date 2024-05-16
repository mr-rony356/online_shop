import SpecialProductCarousel from "./components/SpecialProducts";
import PageHeader from "../../components/ui/PageHeader";
import CategoryCard from "./components/CategoryCard";
import db from "@/db/db";
import ProductsGrid from "./products/_components/ProductsGrid";

function getPopularProducts() {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },

    orderBy: {
      orders: {
        _count: "desc",
      },
    },
    take: 6,
  });
}

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
      <div>
        <PageHeader title="Popular Products" />
        <ProductsGrid fetchProduct={getPopularProducts}></ProductsGrid>
      </div>
    </main>
  );
}
