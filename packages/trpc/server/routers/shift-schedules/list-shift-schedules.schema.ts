import z from "zod";

export const ZListShiftSchedulesSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	offset: z.number().min(0).default(0),
});

export type TListShiftSchedulesSchema = z.infer<
	typeof ZListShiftSchedulesSchema
>;
