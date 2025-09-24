import { db, periods } from "@ecehive/drizzle";
import { eq } from "drizzle-orm";
import type { TGetPeriodSchema } from "./get-period.schema";

export type TGetPeriodOptions = {
	ctx?: {
		userId: string;
	};
	input: TGetPeriodSchema;
};

export default async function getPeriodHandler(options: TGetPeriodOptions) {
	const { id } = options.input;

	const result = await db.select().from(periods).where(eq(periods.id, id));

	return {
		period: result[0],
	};
}
