import z from "zod";

export const ZCreatePeriodSchema = z.object({
	name: z.string().min(1).max(100),
	start: z.date(),
	end: z.date(),
	visibleStart: z.date().optional(),
	visibleEnd: z.date().optional(),
	scheduleSignupStart: z.date().optional(),
	scheduleSignupEnd: z.date().optional(),
	scheduleModifyStart: z.date().optional(),
	scheduleModifyEnd: z.date().optional(),
});

export type TCreatePeriodSchema = z.infer<typeof ZCreatePeriodSchema>;
