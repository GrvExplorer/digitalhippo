import { auth } from "@/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { appRouter } from ".";
import SuperJSON from "superjson";

export const createTRPCContext = async (opts: {
  headers: Headers;
  req: NextRequest;
}) => {
  return {
    ...opts,
  };
};
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const authedProcedure = t.procedure.use(async function (opts) {
  const user = await auth();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
