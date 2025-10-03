import { protectedProcedure, router } from "../../trpc";
import { ZCreatePeriodSchema } from "./create-period.schema";
import { ZDeletePeriodSchema } from "./delete-period.schema";
import { ZGetPeriodSchema } from "./get-period.schema";
import { ZListPeriodsSchema } from "./list-periods.schema";
import { ZUpdatePeriodSchema } from "./update-period.schema";

export const periodsRouter = router({
	listPeriods: protectedProcedure
		.input(ZListPeriodsSchema)
		.query(async ({ input, ctx }) => {
			const handler = await import("./list-periods.handler");
			return await handler.default({ input, ctx });
		}),
	getPeriod: protectedProcedure
		.input(ZGetPeriodSchema)
		.query(async ({ input, ctx }) => {
			const handler = await import("./get-period.handler");
			return await handler.default({ input, ctx });
		}),
	createPeriod: protectedProcedure
		.input(ZCreatePeriodSchema)
		.mutation(async ({ input, ctx }) => {
			const handler = await import("./create-period.handler");
			return await handler.default({ input, ctx });
		}),
	updatePeriod: protectedProcedure
		.input(ZUpdatePeriodSchema)
		.mutation(async ({ input, ctx }) => {
			const handler = await import("./update-period.handler");
			return await handler.default({ input, ctx });
		}),
	deletePeriod: protectedProcedure
		.input(ZDeletePeriodSchema)
		.mutation(async ({ input, ctx }) => {
			const handler = await import("./delete-period.handler");
			return await handler.default({ input, ctx });
		}),
});
