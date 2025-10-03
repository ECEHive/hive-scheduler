import { db, periods } from "@ecehive/drizzle";
import { eq } from "drizzle-orm";
import type { TGetPeriodSchema } from "./get-period.schema";

export type TGetPeriodOptions = {
	ctx: {
		user: {
			role: "admin" | "user" | "guest";
		};
	};
	input: TGetPeriodSchema;
};

export default async function getPeriodHandler(options: TGetPeriodOptions) {
	const { id } = options.input;

	// TODO: For now, anyone can get a period by ID, no role restrictions

	const result = await db.select().from(periods).where(eq(periods.id, id));

	return {
		period: result[0],
	};
}
