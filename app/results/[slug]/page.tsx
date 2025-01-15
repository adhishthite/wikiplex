import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Citation } from "./citation";
import Link from "next/link";
import { headers } from "next/headers";

interface Section {
    id: string;
    title: string;
    content: string;
}

interface NavigationItem {
    title: string;
    href: string;
}

interface NavigationSection {
    title: string;
    items: NavigationItem[];
}

interface QuickFact {
    label: string;
    value: string;
}

interface Citation {
    id: string;
    content: string;
}

interface ArticleData {
    title: string;
    overview: {
        image: string;
        quickFacts: QuickFact[];
    };
    navigation: NavigationSection[];
    sections: Section[];
    citations: Citation[];
}

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

    return (
        <div className="container mx-auto flex-1">
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
                {/* Left Navigation Column */}
                <aside className="lg:w-64 flex-shrink-0 border-r px-4 py-6 hidden lg:block">
                    <ScrollArea className="h-[calc(100vh-3.5rem)]">
                        {data.navigation.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <Link
                                                href={item.href}
                                                className="text-sm hover:text-primary hover:underline block py-1"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ScrollArea>
                </aside>

                {/* Main Content Column */}
                <main className="flex-1 px-4 py-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
                        <ScrollArea className="h-[calc(100vh-3.5rem)]">
                            {data.sections.map((section, index) => (
                                <section key={index} id={section.id} className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="mb-4">
                                            {section.content}
                                            {data.citations[index] && (
                                                <Citation
                                                    id={(index + 1).toString()}
                                                    content={data.citations[index].content}
                                                />
                                            )}
                                        </p>
                                    </div>
                                    <Separator className="my-6" />
                                </section>
                            ))}
                        </ScrollArea>
                    </div>
                </main>

                {/* Right Overview Column */}
                <aside className="lg:w-72 flex-shrink-0 border-l px-4 py-6 hidden lg:block">
                    <ScrollArea className="h-[calc(100vh-3.5rem)]">
                        <Card>
                            <CardContent className="p-4">
                                <Image
                                    src={data.overview.image || "/placeholder.svg"}
                                    alt={data.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto mb-4 rounded-lg"
                                />
                                <div className="space-y-4">
                                    {data.overview.quickFacts.map((fact, index) => (
                                        <div key={index}>
                                            <dt className="text-sm font-medium text-muted-foreground">
                                                {fact.label}
                                            </dt>
                                            <dd className="text-sm mt-1">{fact.value}</dd>
                                            <Separator className="my-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                </aside>
            </div>
        </div>
    );
}
