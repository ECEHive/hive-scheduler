import { publicProcedure, router } from "../../trpc";
import { ZListUsersSchema } from "./list-users.schema";

export const usersRouter = router({
	listUsers: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZListUsersSchema)
		.query(async ({ input }) => {
			const handler = await import("./list-users.handler");
			return await handler.default({ input });
		}),
});
