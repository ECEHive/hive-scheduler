import { publicProcedure, router } from "../../trpc";
import { ZListPeriodsSchema } from "./list-shift-schedules.schema";

export const shiftSchedulesRouter = router({
	listShiftSchedules: publicProcedure // TODO: this should not be public, just for testing/demo
		.input(ZListPeriodsSchema)
		.query(async ({ input }) => {
			const handler = await import("./list-shift-schedules.handler");
			return await handler.default({ input });
		}),
});
