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
  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
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
// Create a new user
export async function createUser(email: string) {
  try {
    const newUser = await db.user.create({
      data: {
        id: crypto.randomUUID(),
        email,
      },
    });
    console.log(`New user created with ID: ${newUser.id}`);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Add a product to the user's cart
// Add a product to the user's cart
export async function addToCart(userId: string, productId: string) {
  try {
    // Check if the user exists
    const userExists = await db.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error(`User with id ${userId} does not exist.`);
    }

    // Check if the product is already in the cart
    const existingCartEntry = await db.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartEntry) {
      // If the product is already in the cart, increment the quantity
      await db.cart.update({
        where: {
          id: existingCartEntry.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      console.log(`Quantity updated for product ${productId} in cart for user ${userId}`);
    } else {
      // If the product is not in the cart, create a new entry
      await db.cart.create({
        data: {
          id: crypto.randomUUID(),
          productId,
          userId,
          quantity: 1, // Set initial quantity to 1
        },
      });
      console.log(`Product with ID ${productId} added to cart for user ${userId}`);
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
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
// Decrease a product quantity in the user's cart
export async function removeFromCart(userId: string, productId: string) {
  try {
    // Check if the user exists
    const userExists = await db.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error(`User with id ${userId} does not exist.`);
    }

    // Check if the product is in the cart
    const cartEntry = await db.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (cartEntry && cartEntry.quantity > 1) {
      // If the product is in the cart and quantity is greater than 1, decrement the quantity
      await db.cart.update({
        where: {
          id: cartEntry.id,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      console.log(`Quantity decreased for product ${productId} in cart for user ${userId}`);
    } else if (cartEntry) {
      // If the quantity is 1, remove the product from the cart
      await db.cart.delete({
        where: {
          id: cartEntry.id,
        },
      });
      console.log(`Product with ID ${productId} removed from cart for user ${userId}`);
    } else {
      // If the product is not in the cart, log an error or handle accordingly
      console.error(`Product with ID ${productId} is not in the cart for user ${userId}`);
    }
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
}

async function deleteImageFromCloudinary(imagePath: string) {
  // Implement Cloudinary API call to delete the image based on imagePath
  // You need to replace this with the actual Cloudinary API call
  // Example: axios.delete("https://api.cloudinary.com/v1_1/dpgvsl8ap/image/delete", {params: {url: imagePath}});
}
