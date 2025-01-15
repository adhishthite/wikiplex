import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search | WikiPlex",
    description: "Search and explore, get knowledge"
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
