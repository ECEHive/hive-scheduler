import { trpc } from "@ecehive/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type AuthUser = {
	id: number;
	name: string | null;
	email: string | null;
	role: string | null;
	// allow other fields if needed
	[key: string]: unknown;
};

export type AuthState = {
	token: string | null;
	user: AuthUser | null;
	status: "idle" | "loading" | "authenticated" | "unauthenticated";
	error?: unknown;
};

export type AuthContextType = AuthState & {
	setToken: (token: string | null) => void;
	logout: () => void;
	refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setTokenState] = useState<string | null>(() => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("auth_token");
	});

	const setToken = useCallback((value: string | null) => {
		setTokenState(value);
		if (typeof window === "undefined") return;
		if (value) {
			localStorage.setItem("auth_token", value);
		} else {
			localStorage.removeItem("auth_token");
		}
	}, []);

	// When token changes, React Query should refetch `auth.me`
	const { data, error, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const res = await trpc.auth.me.query({});
			return res;
		},
		enabled: Boolean(token),
		retry: false,
	});

	// If token removed, clear any previous user data
	const user =
		(token ? (data?.user as AuthUser | undefined) : undefined) ?? null;

	const status: AuthState["status"] = useMemo(() => {
		if (!token) return "unauthenticated";
		if (isLoading || isRefetching) return "loading";
		if (user) return "authenticated";
		// token exists but user failed to load
		return "unauthenticated";
	}, [token, user, isLoading, isRefetching]);

	const refresh = useCallback(async () => {
		if (!token) return;
		await refetch();
	}, [refetch, token]);

	const logout = useCallback(() => {
		setToken(null);
	}, [setToken]);

	// Optional: react to UNAUTHORIZED errors by clearing token
	useEffect(() => {
		if (!error) return;
		const code = error.name ?? error.message;
		if (code === "UNAUTHORIZED") {
			setToken(null);
		}
	}, [error, setToken]);

	const value = useMemo<AuthContextType>(
		() => ({
			token,
			user,
			status,
			error,
			setToken,
			logout,
			refresh,
		}),
		[token, user, status, error, setToken, logout, refresh],
	);

	// Gate rendering until auth state is resolved: if there is a token, wait till user loaded or failed.
	const gateLoading = token ? isLoading || isRefetching : false;

	return (
		<AuthContext.Provider value={value}>
			{gateLoading ? (
				<div className="p-4 text-sm text-muted-foreground">
					Loading your account…
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}

// Helper to require authenticated user; redirects to /login by default
export function RequireAuth({
	children,
	to = "/login",
}: {
	children: React.ReactNode;
	to?: string;
}) {
	const router = useRouter();
	const { status } = useAuth();

	useEffect(() => {
		if (status === "unauthenticated") {
			void router.navigate({ to });
		}
	}, [status, router, to]);

	if (status !== "authenticated") return null;
	return <>{children}</>;
}

// Helper to require a role (when authenticated)
export function RequireRole({
	role,
	roles,
	children,
	to = "/",
	forbiddenFallback,
}: {
	role?: string;
	roles?: string[];
	children: React.ReactNode;
	to?: string;
	forbiddenFallback?: React.ReactNode;
}) {
	const router = useRouter();
	const { status, user } = useAuth();

	useEffect(() => {
		if (status === "authenticated" && user) {
			const allowed = roles?.length
				? roles.includes(String(user.role))
				: user.role === role;
			if (!allowed && !forbiddenFallback) {
				// Navigate away if no fallback provided
				void router.navigate({ to });
			}
		}
	}, [status, user, role, roles, router, to, forbiddenFallback]);

	if (status !== "authenticated") return null;
	const allowed = roles?.length
		? roles.includes(String(user?.role))
		: user?.role === role;
	if (!user) return null;
	if (!allowed) return <>{forbiddenFallback ?? null}</>;
	return <>{children}</>;
}

export function useCurrentUser() {
	return useAuth().user;
}
export function useAuthToken() {
	return useAuth().token;
}
