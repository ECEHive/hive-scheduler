import { createFileRoute } from "@tanstack/react-router";

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
