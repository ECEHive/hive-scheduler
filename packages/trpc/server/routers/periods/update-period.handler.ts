import { db, periods } from "@ecehive/drizzle";
import { eq } from "drizzle-orm";
import type { TUpdatePeriodSchema } from "./update-period.schema";

export type TUpdatePeriodOptions = {
	ctx?: {
		userId: string;
	};
	input: TUpdatePeriodSchema;
};

export default async function updatePeriodHandler(
	options: TUpdatePeriodOptions,
) {
	const { id, name, start, end } = options.input;

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
