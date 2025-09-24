import z from "zod";

export const ZCreatePeriodSchema = z.object({
	name: z.string().min(1).max(100),
	start: z.date(),
	end: z.date(),
});

export type TCreatePeriodSchema = z.infer<typeof ZCreatePeriodSchema>;
