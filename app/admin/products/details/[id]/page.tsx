import db from "@/db/db";
import Image from "next/image";

export default async function pageDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const productDetails = await db.product.findUnique({ where: { id } });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{productDetails?.name}</h1>
      <p className="text-lg">{productDetails?.description}</p>
      <Image src={productDetails?.imagePath || ''} alt={productDetails?.name || ''} height={400} width={400} />
    </div>
  );
}
