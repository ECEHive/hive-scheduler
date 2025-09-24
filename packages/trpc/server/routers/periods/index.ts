import { publicProcedure, router } from "../../trpc";
import { ZCreatePeriodSchema } from "./create-period.schema";
import { ZDeletePeriodSchema } from "./delete-period.schema";
import { ZGetPeriodSchema } from "./get-period.schema";
import { ZListPeriodsSchema } from "./list-periods.schema";
import { ZUpdatePeriodSchema } from "./update-period.schema";

export const periodsRouter = router({
	listPeriods: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZListPeriodsSchema)
		.query(async ({ input }) => {
			const handler = await import("./list-periods.handler");
			return await handler.default({ input });
		}),
	getPeriod: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZGetPeriodSchema)
		.query(async ({ input }) => {
			const handler = await import("./get-period.handler");
			return await handler.default({ input });
		}),
	createPeriod: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZCreatePeriodSchema)
		.mutation(async ({ input }) => {
			const handler = await import("./create-period.handler");
			return await handler.default({ input });
		}),
	updatePeriod: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZUpdatePeriodSchema)
		.mutation(async ({ input }) => {
			const handler = await import("./update-period.handler");
			return await handler.default({ input });
		}),
	deletePeriod: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZDeletePeriodSchema)
		.mutation(async ({ input }) => {
			const handler = await import("./delete-period.handler");
			return await handler.default({ input });
		}),
});
