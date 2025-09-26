import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Render root
const rootElement = document.getElementById("root");
if (!rootElement) {
	alert("Unable to load page. Please try again later.");
	throw new Error("Root element `#root` not found in document");
}
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider defaultTheme="dark" storageKey="ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</StrictMode>,
	);
}
