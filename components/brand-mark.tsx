"use client";

import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
  linked?: boolean;
};

export function BrandMark({ light = false, compact = false, linked = true }: BrandMarkProps) {
  const src = compact
    ? "/brand/bc_labs_mark.svg"
    : light
      ? "/brand/bc_labs_logo_dark.svg"
      : "/brand/bc_labs_logo_light.svg";

  const image = (
    <Image
      src={src}
      alt={compact ? "BC Labs" : "BC Labs & Consultancy"}
      width={compact ? 110 : 600}
      height={compact ? 110 : 130}
      priority={!compact}
      className={compact ? "brand-symbol brand-symbol-image" : "brand-logo-image"}
    />
  );

  return linked
    ? <Link href="/" aria-label="BC Labs home" className="brand-link">{image}</Link>
    : <span className="brand-inline">{image}</span>;
}
