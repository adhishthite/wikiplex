"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
    const router = useRouter();
    const [isSearching, setIsSearching] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSearching(true);
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
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl sm:text-6xl font-bold mb-2 text-primary">
                    <span className="inline-block transform transition-transform hover:scale-105 duration-200">
                        Wiki<span className="text-secondary">Plex</span>
                    </span>
                </h1>
                <p className="text-lg text-muted-foreground">Explore the world of knowledge</p>
            </motion.div>
            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            name="q"
                            placeholder="What do you want to learn about?"
                            className="pl-10 pr-4 py-2 w-full"
                            required
                            disabled={isSearching}
                        />
                    </div>
                    <Button type="submit" size="lg" disabled={isSearching}>
                        {isSearching ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </motion.div>
                        ) : (
                            "Search"
                        )}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
