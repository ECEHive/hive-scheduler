import { db, periods } from "@ecehive/drizzle";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { TUpdatePeriodSchema } from "./update-period.schema";

export type TUpdatePeriodOptions = {
	ctx: {
		user: {
			role: "admin" | "user" | "guest";
		};
	};
	input: TUpdatePeriodSchema;
};

export default async function updatePeriodHandler(
	options: TUpdatePeriodOptions,
) {
	const { id, name, start, end } = options.input;

	// Only admin users can update periods
	if (options.ctx.user.role !== "admin") {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not have permission to update periods",
		});
	}

	// Validate period exists
	const existing = await db.select().from(periods).where(eq(periods.id, id));
	if (existing.length === 0) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: `Period with ID ${id} not found`,
		});
	}

	// TODO: Ensure date values are in order (e.g. start < end, etc.)

	// TODO: Handle changes to existing shift occurrences made by this period update
	// E.g. if the period start/end changes, what happens to existing shifts?

	const result = await db
		.update(periods)
		.set({
			name,
			start,
			end,
		})
		.where(eq(periods.id, id))
		.returning();

	return {
		period: result[0],
	};
}
