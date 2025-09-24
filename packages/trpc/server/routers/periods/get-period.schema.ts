import z from "zod";

export const ZGetPeriodSchema = z.object({
	id: z.number(),
});

export type TGetPeriodSchema = z.infer<typeof ZGetPeriodSchema>;
