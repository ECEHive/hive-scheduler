import { db, periods } from "@ecehive/drizzle";
import { TRPCError } from "@trpc/server";
import { and, count, gte, isNull, lte, or, type SQL } from "drizzle-orm";
import type { TListPeriodsSchema } from "./list-periods.schema";

export type TListPeriodsOptions = {
	ctx: {
		user: {
			role: "admin" | "user" | "guest";
		};
	};
	input: TListPeriodsSchema;
};

export default async function listPeriodsHandler(options: TListPeriodsOptions) {
	const { limit, offset } = options.input;

	// Only admin and user roles can list periods
	if (!["admin", "user"].includes(options.ctx.user.role)) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "You do not have permission to list periods",
		});
	}

	const filter = [] as SQL[];

	// Users can only see periods that are visible
	if (options.ctx.user.role === "user") {
		const now = new Date();
		filter.push(
			and(
				or(isNull(periods.visibleStart), lte(periods.visibleStart, now)),
				or(isNull(periods.visibleEnd), gte(periods.visibleEnd, now)),
			) as SQL,
		);
	}

	const result = await db
		.select()
		.from(periods)
		.where(and(...filter))
		.limit(limit)
		.offset(offset);

	const total = await db
		.select({ count: count() })
		.from(periods)
		.where(and(...filter));

	return {
		periods: result,
		total: total[0]?.count ?? 0,
	};
}
