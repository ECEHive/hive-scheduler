import z from "zod";

export const ZUpdatePeriodSchema = z.object({
	id: z.number(),
	name: z.string().min(1).max(100).optional(),
	start: z.date().optional(),
	end: z.date().optional(),
});

export type TUpdatePeriodSchema = z.infer<typeof ZUpdatePeriodSchema>;
