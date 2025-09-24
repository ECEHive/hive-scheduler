import { db, periods } from "@ecehive/drizzle";
import type { TCreatePeriodSchema } from "./create-period.schema";

export type TCreatePeriodOptions = {
	ctx?: {
		userId: string;
	};
	input: TCreatePeriodSchema;
};

export default async function createPeriodHandler(
	options: TCreatePeriodOptions,
) {
	const { name, start, end } = options.input;

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
