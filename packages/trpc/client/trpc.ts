import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server";

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
			transformer: superjson,
		}),
	],
});
