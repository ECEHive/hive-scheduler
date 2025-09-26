import { validateToken } from "@ecehive/auth";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
	const token = req.headers.authorization?.split(" ")[1];
	const userId = token ? await validateToken(token) : null;

	return { req, res, userId, token };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
