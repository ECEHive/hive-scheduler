import z from "zod";

export const ZLoginSchema = z.object({
	ticket: z.string(),
	service: z.string(),
});

export type TLoginSchema = z.infer<typeof ZLoginSchema>;
