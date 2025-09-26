import { db, periods } from "@ecehive/drizzle";
import { count } from "drizzle-orm";
import type { TListPeriodsSchema } from "./list-shift-schedules.schema";

export type TListPeriodsOptions = {
	ctx?: {
		userId: string;
	};
	input: TListPeriodsSchema;
};

export default async function listPeriodsHandler(options: TListPeriodsOptions) {
	const { limit, offset } = options.input;

	const result = await db.select().from(periods).limit(limit).offset(offset);

	const total = await db.select({ count: count() }).from(periods);

	return {
		periods: result,
		total: total[0]?.count ?? 0,
	};
}
