import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@atelier-amelie-nx-trpc/trpc-routers';

export const trpc = createReactQueryHooks<AppRouter>();
