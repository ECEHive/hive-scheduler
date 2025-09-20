import { db, users } from "@ecehive/drizzle";
import { count } from "drizzle-orm";
import type { TListUsersSchema } from "./list-users.schema";

export type TListUsersOptions = {
	ctx?: {
		userId: string;
	};
	input: TListUsersSchema;
};

export default async function listUsersHandler(options: TListUsersOptions) {
	const { limit = 10, offset = 0 } = options.input;

	const result = await db.select().from(users).limit(limit).offset(offset);

	const total = await db.select({ count: count() }).from(users);

	return {
		users: result,
		total: total[0]?.count ?? 0,
	};
}
