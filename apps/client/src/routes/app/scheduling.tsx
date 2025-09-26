import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/scheduling")({
	component: Scheduling,
});

function Scheduling() {
	return (
		<div className="flex flex-col p-4">
			<p>Scheduling Page</p>
		</div>
	);
}
