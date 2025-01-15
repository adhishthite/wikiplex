import { ReactNode } from "react";
import { Header } from "@/components/header";

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
    </div>
  );
}
