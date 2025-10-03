import { db, periods } from "@ecehive/drizzle";
import { TRPCError } from "@trpc/server";
import type { TCreatePeriodSchema } from "./create-period.schema";

export type TCreatePeriodOptions = {
	ctx: {
		user: {
			role: "admin" | "user" | "guest";
		};
	};
	input: TCreatePeriodSchema;
};

export default async function createPeriodHandler(
	options: TCreatePeriodOptions,
) {
	const { name, start, end } = options.input;

	// Only admin users can create periods
	if (options.ctx.user.role !== "admin") {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not have permission to create periods",
		});
	}

	// TODO: Ensure date values are in order (e.g. start < end, etc.)

	const result = await db
		.insert(periods)
		.values({
			name,
			start,
			end,
		})
		.returning();

	return {
		period: result[0],
	};
}
