import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getReleaseBySlug, getReleases } from "@/server/services/site-service";

const localeSchema = z.enum(["en", "zh", "ja"]);

export const releaseRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ locale: localeSchema, releaseType: z.string().optional() }))
    .query(({ input }) => {
      const all = getReleases(input.locale);
      if (!input.releaseType || input.releaseType === "All") {
        return all;
      }

      return all.filter((item) => item.releaseType === input.releaseType);
    }),
  bySlug: publicProcedure
    .input(z.object({ locale: localeSchema, slug: z.string() }))
    .query(({ input }) => getReleaseBySlug(input.locale, input.slug)),
});
