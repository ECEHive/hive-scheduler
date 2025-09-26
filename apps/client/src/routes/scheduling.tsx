import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scheduling")({
	component: Scheduling,
});

function Scheduling() {
	return <div className="p-2">This is the scheduling page</div>;
}
