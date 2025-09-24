import { db, periods } from "@ecehive/drizzle";
import { eq } from "drizzle-orm";
import type { TDeletePeriodSchema } from "./delete-period.schema";

export type TDeletePeriodOptions = {
	ctx?: {
		userId: string;
	};
	input: TDeletePeriodSchema;
};

export default async function deletePeriodHandler(
	options: TDeletePeriodOptions,
) {
	const { id } = options.input;

	const result = await db.delete(periods).where(eq(periods.id, id)).returning();

	return {
		period: result[0],
	};
}
