import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						{/* Simple logo dot */}
						<div className="size-2 rounded-full bg-primary-foreground" />
					</div>
					Hive Shift Scheduler
				</a>
				<Link
					to="/app"
					className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:opacity-90"
				>
					Open the App
				</Link>
			</div>
		</div>
	);
}
