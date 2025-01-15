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
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-primary tracking-tight">
                    <motion.span
                        className="inline-block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Wiki<span className="text-secondary">Plex</span>
                    </motion.span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
                    Your gateway to endless knowledge exploration
                </p>
            </motion.div>
            <motion.div
                className="w-full max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <form className="flex space-x-3" onSubmit={handleSubmit}>
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            type="search"
                            name="q"
                            placeholder="What do you want to learn about?"
                            className="pl-12 pr-4 py-6 w-full text-xl sm:text-2xl rounded-xl"
                            required
                            disabled={isSearching}
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSearching}
                        className="px-8 py-6 text-lg rounded-xl"
                    >
                        {isSearching ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Loader2 className="w-5 h-5 animate-spin" />
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
