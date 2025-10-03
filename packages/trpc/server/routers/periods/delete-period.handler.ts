import { db, periods } from "@ecehive/drizzle";
import { TRPCError } from "@trpc/server/dist/unstable-core-do-not-import.cjs";
import { eq } from "drizzle-orm";
import type { TDeletePeriodSchema } from "./delete-period.schema";

export type TDeletePeriodOptions = {
	ctx: {
		user: {
			role: "admin" | "user" | "guest";
		};
	};
	input: TDeletePeriodSchema;
};

export default async function deletePeriodHandler(
	options: TDeletePeriodOptions,
) {
	const { id } = options.input;

	// Only admin users can update periods
	if (options.ctx.user.role !== "admin") {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not have permission to update periods",
		});
	}

	const result = await db.delete(periods).where(eq(periods.id, id)).returning();

	return {
		period: result[0],
	};
}
