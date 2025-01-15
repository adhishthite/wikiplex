import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Citation } from "./citation";
import Link from "next/link";

// This would typically come from your API or database
const getResultData = async (slug: string) => {
  try {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
      overview: {
        image: "/placeholder.svg?height=300&width=300",
        quickFacts: [
          { label: "Type", value: "Article" },
          { label: "Industry", value: "Technology" },
          { label: "Founded", value: "2023" },
          { label: "Headquarters", value: "San Francisco, CA" },
        ],
      },
      navigation: [
        {
          title: "Main sections",
          items: [
            { title: "History", href: "#history" },
            { title: "Features", href: "#features" },
            { title: "Technology", href: "#technology" },
          ],
        },
        {
          title: "Related pages",
          items: [
            { title: "Getting Started", href: "/getting-started" },
            { title: "Documentation", href: "/documentation" },
            { title: "API Reference", href: "/api" },
          ],
        },
      ],
      sections: [
        {
          id: "history",
          title: "History",
          content: `The history section provides detailed information about the origins and development...`,
        },
        {
          id: "features",
          title: "Features",
          content: `Key features and capabilities are outlined in this section...`,
        },
        {
          id: "technology",
          title: "Technology",
          content: `The technology stack and implementation details...`,
        },
      ],
      citations: [
        {
          id: "1",
          content: "Reference 1: Academic paper discussing the topic",
        },
        {
          id: "2",
          content: "Reference 2: Industry report with relevant statistics",
        },
        { id: "3", content: "Reference 3: Expert analysis and insights" },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch article data");
  }
};

export default async function ResultPage({
  params,
}: {
  params: { slug: string };
}) {
  let data;
  try {
    data = await getResultData(params.slug);
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-xl">
          Failed to fetch article data. Please try again later.
        </p>
      </div>
    );
  }

  if (!data) notFound();

  return (
    <div className="container mx-auto flex-1 pt-14">
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
                  <h2 className="text-2xl font-semibold mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm max-w-none">
                    <p className="mb-4">
                      {section.content}
                      <Citation
                        id={(index + 1).toString()}
                        content={data.citations[index].content}
                      />
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
