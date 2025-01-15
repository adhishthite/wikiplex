import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto flex-1 pt-14">
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
                {/* Left Navigation Column */}
                <aside className="lg:w-64 flex-shrink-0 border-r px-4 py-6 hidden lg:block">
                    <div className="space-y-6">
                        <div>
                            <Skeleton className="h-4 w-32 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-3 w-36" />
                                <Skeleton className="h-3 w-44" />
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-4 w-32 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-3 w-36" />
                                <Skeleton className="h-3 w-44" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Column */}
                <main className="flex-1 px-4 py-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <Skeleton className="h-10 w-3/4 mb-6" />
                        <div className="space-y-8">
                            <div>
                                <Skeleton className="h-6 w-1/3 mb-4" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                            <div>
                                <Skeleton className="h-6 w-1/3 mb-4" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Overview Column */}
                <aside className="lg:w-72 flex-shrink-0 border-l px-4 py-6 hidden lg:block">
                    <div className="space-y-6">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div>
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div>
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
