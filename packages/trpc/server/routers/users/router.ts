import { db, users } from "@ecehive/drizzle";
import { publicProcedure, router } from "../../trpc";
import { ZListUsersSchema } from "./list-users.schema";

export const usersRouter = router({
	listUsers: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZListUsersSchema)
		.query(async ({ input }) => {
			const { limit = 10, offset = 0 } = input;
			const result = await db.select().from(users).limit(limit).offset(offset);
			return result;
		}),
});
