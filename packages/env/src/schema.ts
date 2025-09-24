import z from "zod";

export const ZEnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.url(),
});

export type TEnvSchema = z.infer<typeof ZEnvSchema>;
