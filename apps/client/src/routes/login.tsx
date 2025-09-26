import { trpc } from "@ecehive/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	const params = useMemo(() => {
		if (typeof window === "undefined") return new URLSearchParams("");
		return new URLSearchParams(window.location.search);
	}, []);

	const ticket = params.get("ticket") ?? "";
	const service = params.get("service") ?? "";

	useEffect(() => {
		if (typeof window === "undefined") return;

		// If both are missing or empty, redirect to CAS with a redirect back to this page
		if (!ticket && !service) {
			const redirect = encodeURIComponent(window.location.href);
			const casUrl = `https://sites.gatech.edu/lemons/cas-d?redirect=${redirect}`;
			window.location.href = casUrl;
		}
	}, [ticket, service]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["login", ticket, service],
		queryFn: async () => {
			return await trpc.auth.login.query({ ticket, service });
		},
		enabled: Boolean(ticket && service),
		retry: false,
	});

	if (!ticket && !service) return null; // redirecting

	return (
		<div className="p-2">
			<h1 className="text-lg font-semibold mb-2">Login</h1>

			{isLoading && <div>Completing login...</div>}

			{error && <div className="text-red-600">Error completing login.</div>}

			{data ? (
				<div>
					<div className="mb-2">Login completed successfully.</div>
					<div>
						<strong>Token:</strong>
						<pre className="break-words bg-green-800 p-2 rounded mt-1">
							{data.token}
						</pre>
					</div>
				</div>
			) : (
				!isLoading && (
					<div>
						No login data yet. If you were redirected back from CAS, the request
						will run automatically.
					</div>
				)
			)}
		</div>
	);
}
