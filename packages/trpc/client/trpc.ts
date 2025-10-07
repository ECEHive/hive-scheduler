/// <reference types="vite/client" />

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server/router";

// Determine base URL for tRPC requests
const getBaseUrl = () => {
	// Always use relative "/trpc" in dev, no extra base URL
	if (import.meta.env.DEV) {
		return "";
	}

	// Use public API URL if specified in production, else fallback to relative
	return import.meta.env.VITE_PUBLIC_API_URL ?? "";
};

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/trpc`,
			transformer: superjson,
			headers() {
				if (typeof window === "undefined") return {};
				const token = localStorage.getItem("auth_token");
				return token ? { Authorization: `Bearer ${token}` } : {};
			},
		}),
	],
});
