"use client";

import { Copy, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ShareLabels = {
  x: string;
  copy: string;
  copied: string;
};

export function Thoughts2Share({
  title,
  labels,
  className,
  compact = false,
}: {
  title: string;
  labels: ShareLabels;
  className?: string;
  compact?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const shareUrl = baseUrl ? `${baseUrl}${pathname}` : pathname;
  const xHref = `https://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;

  async function handleCopy() {
    const value = typeof window === "undefined" ? shareUrl : window.location.href;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={className}>
      <Link href={xHref} target="_blank" rel="noreferrer" aria-label={labels.x} title={labels.x}>
        {compact ? <span aria-hidden="true">X</span> : labels.x}
      </Link>
      <button type="button" onClick={handleCopy} aria-label={copied ? labels.copied : labels.copy} title={copied ? labels.copied : labels.copy}>
        {compact ? (copied ? <Copy size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />) : copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
