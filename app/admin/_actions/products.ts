"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import axios from "axios"; // Import Axios for making HTTP requests

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  // Upload image to Cloudinary and get the secure URL
  const imagePath = await uploadImageToCloudinary(data.image);
console.log(imagePath)
  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.description,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: `${data.file}`, // Assuming filePath remains as it is
      imagePath: imagePath, // Set the imagePath to the Cloudinary URL
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  // Upload new image to Cloudinary if provided
  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await deleteImageFromCloudinary(imagePath); // Delete old image from Cloudinary
    imagePath = await uploadImageToCloudinary(data.image); // Upload new image and get URL
  }

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

}

async function uploadImageToCloudinary(imageFile: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "mgf79dzn"); // Replace with your upload preset
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpgvsl8ap/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

async function deleteImageFromCloudinary(imagePath: string) {
  // Implement Cloudinary API call to delete the image based on imagePath
  // You need to replace this with the actual Cloudinary API call
  // Example: axios.delete("https://api.cloudinary.com/v1_1/dpgvsl8ap/image/delete", {params: {url: imagePath}});
}
