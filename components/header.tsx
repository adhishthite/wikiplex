import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto h-14 flex items-center justify-between">
                <div className="mr-4 flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="text-xl font-extrabold">WikiPlex</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-between md:w-40 lg:w-64">
                            <span className="inline-flex">Search...</span>
                            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </button>
                    </div>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
