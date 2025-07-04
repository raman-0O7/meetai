"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft, PanelLeftClose, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
	const { state, toggleSidebar, isMobile } = useSidebar();
	const [commandOpen, setCommandOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				setCommandOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	return (
		<>
			<DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
			<nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
				<Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
					{state === "collapsed" || isMobile ? (
						<PanelLeft className="size-4" />
					) : (
						<PanelLeftClose className="size-4" />
					)}
				</Button>
				<Button
					className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
					variant="outline"
					onClick={() => setCommandOpen((open) => !open)}
					size="sm"
				>
					<SearchIcon />
					Search
					<kbd className="ml-auto pointer-events-auto inline-flex h-5 select-none items-center gap-1 rounded bg-muted border px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
						<span className="text-xs">&#8984;</span>k
					</kbd>
				</Button>
			</nav>
		</>
	);
};
