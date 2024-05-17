"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCart, removeFromCart } from "@/app/admin/_actions/products";

export function AddToCartButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await addToCart("1", id);
          router.refresh();
        });
      }}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
export function AddToCartIcon({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <span
      onClick={() => {
        startTransition(async () => {
          await addToCart("1", id);
          router.refresh();
        });
      }}
    >
      +{" "}
    </span>
  );
}
export function RemoveCartButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        removeFromCart("1", id);
        router.refresh();
      }}
    >
      - 
    </span>
  );
}
