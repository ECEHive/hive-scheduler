import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const RootLayout = () => (
	<>
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-col w-full">
				<div className="flex flex-row p-4 w-full border-b border-border">
					<SidebarTrigger />
				</div>
				<Outlet />
			</div>
		</SidebarProvider>
	</>
);

export const Route = createRootRoute({ component: RootLayout });
