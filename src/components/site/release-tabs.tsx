"use client";

import { useMemo, useState } from "react";

import { ReleasesGridSection } from "@/components/sections/releases-grid";
import type { Locale, ReleaseGridItem } from "@/types/site";

const filterKeys = ["All", "Album", "EP", "Single", "Compilation", "Collaboration"] as const;

type FilterKey = (typeof filterKeys)[number];

export function ReleaseTabs({
  locale,
  title,
  moreLabel,
  items,
  labels,
}: {
  locale: Locale;
  title: string;
  moreLabel: string;
  items: ReleaseGridItem[];
  labels: Record<FilterKey, string>;
}) {
  const [active, setActive] = useState<FilterKey>("All");

  const filteredItems = useMemo(() => {
    if (active === "All") {
      return items;
    }

    return items.filter((item) => item.releaseType === active);
  }, [active, items]);

  return (
    <div className="bg-[#f2f2f2]">
      <div className="site-nav-frame pt-10">
        <div className="flex flex-wrap gap-4 border-b border-neutral-300 pb-4">
          {filterKeys.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`text-[12px] font-semibold tracking-[0.08em] ${
                filter === active ? "text-[#101010]" : "text-neutral-500"
              }`}
            >
              {labels[filter]}
            </button>
          ))}
        </div>
      </div>
      <ReleasesGridSection locale={locale} title={title} moreLabel={moreLabel} items={filteredItems} />
    </div>
  );
}
