import { trpc } from "@ecehive/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
	const { setToken, status } = useAuth();
	const router = useRouter();
	const params = useMemo(() => {
		if (typeof window === "undefined") return new URLSearchParams("");
		return new URLSearchParams(window.location.search);
	}, []);

	const ticket = params.get("ticket") ?? "";
	const service = params.get("service") ?? "";
	const returnTo = params.get("returnTo") ?? "/app";

	// If already authenticated, go to returnTo
	useEffect(() => {
		if (status === "authenticated") {
			void router.navigate({ to: returnTo });
		}
	}, [status, router, returnTo]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["login", ticket, service],
		queryFn: async () => {
			return await trpc.auth.login.query({ ticket, service });
		},
		enabled: Boolean(ticket && service),
		retry: false,
	});

	useEffect(() => {
		if (data?.token) {
			setToken(data.token);
			void router.navigate({ to: returnTo });
		}
	}, [data?.token, setToken, router, returnTo]);

	// Start CAS login on demand
	const startCasLogin = () => {
		if (typeof window === "undefined") return;
		const current = new URL(window.location.href);
		if (!current.searchParams.get("returnTo"))
			current.searchParams.set("returnTo", returnTo);
		const redirect = encodeURIComponent(current.toString());
		const casUrl = `https://sites.gatech.edu/lemons/cas-d?redirect=${redirect}`;
		window.location.href = casUrl;
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						{/* Simple logo dot */}
						<div className="size-2 rounded-full bg-primary-foreground" />
					</div>
					Hive Shift Scheduler
				</div>
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Welcome back</CardTitle>
							<CardDescription>
								Sign in with your Georgia Tech Account
							</CardDescription>
						</CardHeader>
						<CardContent>
							{ticket && service ? (
								<div>
									{isLoading && (
										<div className="text-muted-foreground">
											Validating your ticket…
										</div>
									)}
									{error && (
										<div className="border border-destructive/30 bg-destructive/10 text-destructive rounded-md p-3 mt-3">
											<div className="font-medium mb-1">Login failed</div>
											<div className="text-sm">
												An unexpected error occurred.
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="grid gap-6">
									<Button onClick={startCasLogin} className="w-full">
										Login with GT SSO
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
					<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
						Use of this application is for authorized Hive Makerspace members
						with Georgia Tech accounts only.
					</div>
				</div>
			</div>
		</div>
	);
}
