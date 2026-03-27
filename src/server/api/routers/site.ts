import { z } from "zod";

import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";
import { getFooter, getNavigation, getSiteConfig } from "@/server/services/site-service";

const localeSchema = z.enum(["en", "zh", "jp"]);

export const siteRouter = createTRPCRouter({
  getConfig: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getSiteConfig(input.locale)),
  getNavigation: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getNavigation(input.locale)),
  getFooter: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getFooter(input.locale)),
});
