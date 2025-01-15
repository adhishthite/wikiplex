"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get("q")?.toString() || "";

        // Create a URL-friendly slug from the search term
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
            <h1 className="text-6xl font-bold mb-8 text-primary">WikiPlex</h1>
            <div className="w-full max-w-3xl">
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                    <Input
                        type="search"
                        name="q"
                        placeholder="Search WikiPlex..."
                        className="flex-grow"
                        required
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </div>
    );
}
