import z from "zod";

export const ZUpdatePeriodSchema = z.object({
	id: z.number(),
	name: z.string().min(1).max(100).optional(),
	start: z.date().optional(),
	end: z.date().optional(),
	visibleStart: z.date().optional(),
	visibleEnd: z.date().optional(),
	scheduleSignupStart: z.date().optional(),
	scheduleSignupEnd: z.date().optional(),
	scheduleModifyStart: z.date().optional(),
	scheduleModifyEnd: z.date().optional(),
});

export type TUpdatePeriodSchema = z.infer<typeof ZUpdatePeriodSchema>;
