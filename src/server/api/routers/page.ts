import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getPageContent } from "@/server/services/site-service";

const localeSchema = z.enum(["en", "zh", "ja"]);

export const pageRouter = createTRPCRouter({
  byKey: publicProcedure
    .input(z.object({ locale: localeSchema, pageKey: z.enum(["about", "thoughts"]) }))
    .query(({ input }) => getPageContent(input.locale, input.pageKey)),
});
