import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RequireAuth } from "@/auth/AuthProvider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/app/")({
	component: AppIndexLayout,
});

function AppIndexLayout() {
	return (
		<div className="flex flex-col p-4">
			<p>App Index Page</p>
		</div>
	);
}
