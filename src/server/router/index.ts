// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';

import { protectedExampleRouter } from './protected-example-router';
import { orderRouter } from './admin/order.router';
import { courierRouter } from './admin/courier.router';
import { restaurantRouter } from './admin/restaurant.router';
import { branchRouter } from './admin/branch.router';
import { categoryRouter } from './admin/category.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', protectedExampleRouter)
  .merge('order.', orderRouter)
  .merge('courier.', courierRouter)
  .merge('restaurant.', restaurantRouter)
  .merge('branch.', branchRouter)
  .merge('category.', categoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
