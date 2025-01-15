"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Citation as CitationComponent } from "./citation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArticleData, NavigationSection, Section, Citation, QuickFact } from "./types";

const LeftNavigation = ({ navigation }: { navigation: NavigationSection[] }) => (
    <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-64 flex-shrink-0 border-r px-4 py-6 hidden lg:block"
    >
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
            {navigation.map((section, index) => (
                <div key={index} className="mb-6">
                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
                        {section.title}
                    </h3>
                    <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                <Link
                                    href={item.href}
                                    className="text-sm hover:text-primary hover:underline block py-1 transition-colors duration-200"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </ScrollArea>
    </motion.aside>
);

const MainContent = ({
    title,
    sections,
    citations
}: {
    title: string;
    sections: Section[];
    citations: Citation[];
}) => (
    <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 px-4 py-6 lg:px-8"
    >
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                {sections.map((section, index) => (
                    <motion.section
                        key={index}
                        id={section.id}
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <p className="mb-4">
                                {section.content}
                                {citations[index] && (
                                    <CitationComponent
                                        id={(index + 1).toString()}
                                        content={citations[index].content}
                                    />
                                )}
                            </p>
                        </div>
                        <Separator className="my-6" />
                    </motion.section>
                ))}
            </ScrollArea>
        </div>
    </motion.main>
);

const RightOverview = ({
    overview,
    title
}: {
    overview: { image: string; quickFacts: QuickFact[] };
    title: string;
}) => (
    <motion.aside
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-72 flex-shrink-0 border-l px-4 py-6 hidden lg:block"
    >
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <Card>
                <CardContent className="p-4">
                    <Image
                        src={overview.image || "/placeholder.svg"}
                        alt={title}
                        width={300}
                        height={300}
                        className="w-full h-auto mb-4 rounded-lg"
                    />
                    <div className="space-y-4">
                        {overview.quickFacts.map((fact, index) => (
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
    </motion.aside>
);

export default function ResultPageClient({ data }: { data: ArticleData }) {
    return (
        <div className="container mx-auto flex-1">
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
                <LeftNavigation navigation={data.navigation} />
                <MainContent
                    title={data.title}
                    sections={data.sections}
                    citations={data.citations}
                />
                <RightOverview overview={data.overview} title={data.title} />
            </div>
        </div>
    );
}
