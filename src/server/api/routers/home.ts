import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getFeaturedReleases, getHero, getNews } from "@/server/services/site-service";

const localeSchema = z.enum(["en", "zh", "ja"]);

export const homeRouter = createTRPCRouter({
  getHero: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getHero(input.locale)),
  listNews: publicProcedure
    .input(z.object({ locale: localeSchema, limit: z.number().min(1).max(20).optional() }))
    .query(({ input }) => getNews(input.locale).slice(0, input.limit ?? 4)),
  listFeaturedReleases: publicProcedure
    .input(z.object({ locale: localeSchema, limit: z.number().min(1).max(20).optional() }))
    .query(({ input }) => getFeaturedReleases(input.locale).slice(0, input.limit ?? 10)),
});
