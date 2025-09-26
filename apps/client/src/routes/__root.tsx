import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/auth/AuthProvider";

const RootLayout = () => (
	<>
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	</>
);

export const Route = createRootRoute({ component: RootLayout });
