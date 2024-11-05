import "server-only";

import { appRouter } from "@/server";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import SuperJSON from "superjson";

export const getQueryClient = cache(makeQueryClient);
// @ts-ignore
const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
 getQueryClient
);
