import z from "zod";

export const ZListUsersSchema = z.object({
	limit: z.number().min(1).max(100).optional(),
	offset: z.number().min(0).optional(),
});

export type TListUsersSchema = z.infer<typeof ZListUsersSchema>;
