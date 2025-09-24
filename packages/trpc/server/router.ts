import { periodsRouter } from "./routers/periods";
import { usersRouter } from "./routers/users";
import { router } from "./trpc";

export const appRouter = router({
	users: usersRouter,
	periods: periodsRouter,
});

export type AppRouter = typeof appRouter;
