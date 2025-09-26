import type { SelectUser } from "@ecehive/drizzle";
import type { TMeSchema } from "./me.schema";

export type TMeOptions = {
	ctx: {
		userId: number;
		user: SelectUser;
	};
	input: TMeSchema;
};

export default async function meHandler(options: TMeOptions) {
	return { user: options.ctx.user };
}
