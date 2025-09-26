import z from "zod";

export const ZMeSchema = z.object({});

export type TMeSchema = z.infer<typeof ZMeSchema>;
