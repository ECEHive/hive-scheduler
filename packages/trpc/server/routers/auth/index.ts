import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { ZLoginSchema } from "./login.schema";
import { ZMeSchema } from "./me.schema";

export const authRouter = router({
	login: publicProcedure.input(ZLoginSchema).query(async (opts) => {
		const handler = await import("./login.handler");
		return await handler.default(opts);
	}),
	me: protectedProcedure.input(ZMeSchema).query(async (opts) => {
		const handler = await import("./me.handler");
		return await handler.default(opts);
	}),
});
