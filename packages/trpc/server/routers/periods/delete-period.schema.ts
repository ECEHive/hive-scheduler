import z from "zod";

export const ZDeletePeriodSchema = z.object({
	id: z.number(),
});

export type TDeletePeriodSchema = z.infer<typeof ZDeletePeriodSchema>;
