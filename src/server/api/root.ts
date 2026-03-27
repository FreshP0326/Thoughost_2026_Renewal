import { createTRPCRouter } from "@/server/api/trpc";
import { homeRouter } from "@/server/api/routers/home";
import { pageRouter } from "@/server/api/routers/page";
import { projectRouter } from "@/server/api/routers/project";
import { releaseRouter } from "@/server/api/routers/release";
import { siteRouter } from "@/server/api/routers/site";

export const appRouter = createTRPCRouter({
  site: siteRouter,
  home: homeRouter,
  release: releaseRouter,
  project: projectRouter,
  page: pageRouter,
});

export type AppRouter = typeof appRouter;
