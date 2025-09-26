import { Link } from "@tanstack/react-router";
import { Calendar, ChevronUp, Home, User2 } from "lucide-react";
import { useAuth, useCurrentUser } from "@/auth/AuthProvider";
import { useTheme } from "@/components/theme-provider"; // Import useTheme from theme-provider
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Removed ModeToggle button in favor of options inside the user dropdown

// Menu items.
const items = [
	{
		title: "Home",
		url: "/app",
		icon: Home,
	},
	{
		title: "Scheduling",
		url: "/app/scheduling",
		icon: Calendar,
	},
];

export function AppSidebar() {
	const user = useCurrentUser();
	const { logout } = useAuth();
	const { setTheme } = useTheme();
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Hive Shift Scheduler</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				{/* User dropdown with theme options */}
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {user?.name ?? user?.email ?? "Account"}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuLabel>Theme</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => setTheme("light")}>
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => setTheme("dark")}>
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => setTheme("system")}>
									System
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onSelect={() => logout()}>
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* Removed ModeToggle button */}
			</SidebarFooter>
		</Sidebar>
	);
}
