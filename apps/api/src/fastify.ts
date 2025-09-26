import { type AppRouter, appRouter, createContext } from "@ecehive/trpc/server";
import cors from "@fastify/cors";
import fastifyWebsocket from "@fastify/websocket";
import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";

const server = fastify({
	routerOptions: {
		maxParamLength: 5000,
	},
});

const allowedOrigins = process.env.CORS_ORIGINS
	? process.env.CORS_ORIGINS.split(",")
	: "*";

server.register(cors, {
	origin: allowedOrigins,
	credentials: true, // Allow cookies/auth headers
});

server.register(fastifyWebsocket);

server.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: {
		router: appRouter,
		createContext,
		onError({ path, error }) {
			console.error(`Error in tRPC handler on path '${path}':`, error);
		},
	} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

export { server };
