import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getProjects } from "@/server/services/site-service";

const localeSchema = z.enum(["en", "zh", "ja"]);

export const projectRouter = createTRPCRouter({
  list: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getProjects(input.locale)),
  featured: publicProcedure.input(z.object({ locale: localeSchema })).query(({ input }) => getProjects(input.locale).slice(0, 1)),
});
