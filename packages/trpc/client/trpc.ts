/// <reference types="vite/client" />

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server/router";

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "/trpc",
			transformer: superjson,
			headers() {
				if (typeof window === "undefined") return {};
				const token = localStorage.getItem("auth_token");
				return token ? { Authorization: `Bearer ${token}` } : {};
			},
		}),
	],
});
