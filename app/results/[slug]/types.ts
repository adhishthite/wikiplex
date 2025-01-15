export interface Section {
    id: string;
    title: string;
    content: string;
}

export interface NavigationItem {
    title: string;
    href: string;
}

export interface NavigationSection {
    title: string;
    items: NavigationItem[];
}

export interface QuickFact {
    label: string;
    value: string;
}

export interface Citation {
    id: string;
    content: string;
}

export interface ArticleData {
    title: string;
    overview: {
        image: string;
        quickFacts: QuickFact[];
    };
    navigation: NavigationSection[];
    sections: Section[];
    citations: Citation[];
}
