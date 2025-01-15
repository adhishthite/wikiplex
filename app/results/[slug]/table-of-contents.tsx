import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableOfContentsProps {
    sections: { title: string; id: string }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50px 0px -50% 0px" }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-1">
                {sections.map(({ title, id }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`block py-1 text-sm transition-colors hover:text-primary ${
                            activeSection === id
                                ? "font-medium text-primary"
                                : "text-muted-foreground"
                        }`}
                    >
                        {title}
                    </a>
                ))}
            </nav>
        </ScrollArea>
    );
}
