import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  if (options.revalidate === false) {
    return cb; // Bypass caching by directly returning the callback
  }
  return nextCache(reactCache(cb), keyParts, options);
}
