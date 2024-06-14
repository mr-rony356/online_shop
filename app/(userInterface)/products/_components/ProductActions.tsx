"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCart, removeFromCart } from "@/app/admin/_actions/products";

export function AddToCartButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToCart("666c8e87a4f6915aa99e7cb5", id);
      router.refresh();
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}

export function AddToCartIcon({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToCart("666c8e87a4f6915aa99e7cb5", id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded"
      aria-label="Add to cart"
    >
      {isPending ? "..." : "+"}
    </button>
  );
}

export function RemoveFromCartButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await removeFromCart("666c8e87a4f6915aa99e7cb5", id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded"
      aria-label="Remove from cart"
    >
      {isPending ? "..." : "-"}
    </button>
  );
}
