import { usersRouter } from "./routers/users";
import { router } from "./trpc";

const appRouter = router({
	users: usersRouter,
});

export type AppRouter = typeof appRouter;
