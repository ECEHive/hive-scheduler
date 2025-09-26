import { authRouter } from "./routers/auth";
import { periodsRouter } from "./routers/periods";
import { usersRouter } from "./routers/users";
import { router } from "./trpc";

export const appRouter = router({
	auth: authRouter,
	users: usersRouter,
	periods: periodsRouter,
});

export type AppRouter = typeof appRouter;
