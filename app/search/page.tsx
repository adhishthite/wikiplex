"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get("q")?.toString() || "";

        const slug = searchTerm
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        if (slug) {
            router.push(`/results/${slug}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] bg-background px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-6xl font-bold mb-2 text-primary">
                    <span className="inline-block transform transition-transform hover:scale-105 duration-200">
                        Wiki<span className="text-secondary">Plex</span>
                    </span>
                </h1>
                <p className="text-lg text-muted-foreground">Explore the world of knowledge</p>
            </div>
            <div className="w-full max-w-2xl">
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            name="q"
                            placeholder="What do you want to learn about?"
                            className="pl-10 pr-4 py-2 w-full"
                            required
                        />
                    </div>
                    <Button type="submit" size="lg">
                        Search
                    </Button>
                </form>
            </div>
        </div>
    );
}
