import { db, users } from "@ecehive/drizzle";
import { initTRPC } from "@trpc/server";
import { eq } from "drizzle-orm";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
	if (!opts.ctx.userId) {
		throw new Error("Unauthorized");
	}

	const findUserResult = await db
		.select()
		.from(users)
		.where(eq(users.id, opts.ctx.userId));
	const user = findUserResult[0];

	if (!user) {
		throw new Error("User not found");
	}

	return opts.next({
		ctx: {
			userId: opts.ctx.userId,
			token: opts.ctx.token,
			user,
		},
	});
});
