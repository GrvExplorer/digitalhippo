import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { userRouter } from "@/server/api/routers/user.router";
import { router } from "./trpc";
import { webhookRouter } from './api/routers/webhook.router';
import { sellerRouter } from './api/routers/seller.router';
import { kitRouter } from './api/routers/kit.router';
import { categoryRouter } from './api/routers/category.router';
import { orderRouter } from './api/routers/order.router';
export const appRouter = router({
  user: userRouter,
  seller: sellerRouter,
  webhook: webhookRouter,
  kit: kitRouter,
  category: categoryRouter,
  order: orderRouter,
});
export type AppRouter = typeof appRouter;
