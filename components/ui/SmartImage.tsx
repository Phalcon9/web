"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper that sits on a branded gradient placeholder.
 * If the remote image (e.g. Unsplash) fails to load, the gradient
 * remains visible instead of a broken-image icon.
 */
export function SmartImage({
  className,
  wrapperClassName,
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-accent-600",
        wrapperClassName,
      )}
    >
      {!failed && (
        <Image
          alt={alt}
          className={cn("object-cover", className)}
          onError={() => setFailed(true)}
          {...props}
        />
      )}
    </div>
  );
}
