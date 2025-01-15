import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";
import ResultPageClient from "./ResultPageClient";
import { ArticleData, Section, Citation } from "./types";

export const metadata: Metadata = {
    title: "Article | WikiPlex",
    description: "Explore and learn about topics on WikiPlex"
};

const getResultData = async (slug: string): Promise<ArticleData> => {
    try {
        const headersList = headers();
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
        const host = headersList.get("host") || "localhost:3000";
        const baseUrl = `${protocol}://${host}`;

        const response = await fetch(`${baseUrl}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ searchTerm: slug.replace(/-/g, " ") }),
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch article data");
        }

        const data = await response.json();

        // Parse the markdown content from Perplexity
        const content = data.content;

        // Extract citations if they exist at the end of the content
        let mainContent = content;
        let citationsList: Citation[] = [];

        const citationSplitIndex = content.toLowerCase().lastIndexOf("suggested citations");
        if (citationSplitIndex !== -1) {
            mainContent = content.substring(0, citationSplitIndex).trim();
            const citationsSection = content.substring(citationSplitIndex);
            citationsList = citationsSection
                .split("\n")
                .filter(
                    (line: string) =>
                        line.trim() && !line.toLowerCase().includes("suggested citations")
                )
                .map((citation: string, index: number) => ({
                    id: (index + 1).toString(),
                    content: citation.trim()
                }));
        }

        // Parse sections from the main content
        const sections: Section[] = mainContent
            .split("\n#")
            .filter(Boolean)
            .map((section: string) => {
                const lines = section.trim().split("\n");
                const title = lines[0].replace("#", "").trim();
                const content = lines.slice(1).join("\n").trim();
                return {
                    id: title.toLowerCase().replace(/\s+/g, "-"),
                    title,
                    content
                };
            });

        return {
            title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
            overview: {
                image: "/placeholder.svg?height=300&width=300",
                quickFacts: [
                    { label: "Source", value: "Perplexity AI" },
                    { label: "Last Updated", value: new Date().toLocaleDateString() }
                ]
            },
            navigation: [
                {
                    title: "Main sections",
                    items: sections.map((section) => ({
                        title: section.title,
                        href: `#${section.id}`
                    }))
                }
            ],
            sections,
            citations:
                citationsList.length > 0
                    ? citationsList
                    : [{ id: "1", content: "Generated using Perplexity AI" }]
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch article data");
    }
};

export default async function ResultPage({ params }: { params: { slug: string } }) {
    let data;
    try {
        data = await getResultData(params.slug);
    } catch {
        return (
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-1">
                <h1 className="text-4xl font-bold mb-4">Error</h1>
                <p className="text-xl">Failed to fetch article data. Please try again later.</p>
            </div>
        );
    }

    if (!data) notFound();

    return <ResultPageClient data={data} />;
}
