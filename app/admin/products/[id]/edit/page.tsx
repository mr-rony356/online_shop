import db from "@/db/db";
import PageHeader from "@/app/admin/_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <>
      <PageHeader title={`Edit Product: ${product?.name}`} />
      <ProductForm product={product} />
    </>
  );
}
