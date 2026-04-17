// Reserved scaffolding only: this tRPC factory is kept aligned with the current
// locale/content contract, but there is no live HTTP route or runtime consumer.
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
