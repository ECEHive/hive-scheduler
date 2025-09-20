import { type AppRouter, appRouter, createContext } from "@ecehive/trpc/server";
import fastifyWebsocket from "@fastify/websocket";
import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";

const server = fastify({
	maxParamLength: 5000,
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
