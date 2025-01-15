import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { searchTerm } = await request.json();

        if (!searchTerm) {
            return NextResponse.json({ error: "Search term is required" }, { status: 400 });
        }

        const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

        if (!PERPLEXITY_API_KEY) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        const response = await fetch("https://api.perplexity.ai/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PERPLEXITY_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant that provides comprehensive information about topics. Format your response in markdown with clear section headers starting with # for main sections. For each major claim or fact, provide a citation in the format [citation needed]. At the end of your response, provide a list of suggested citations that could support the claims made."
                    },
                    {
                        role: "user",
                        content: `Provide detailed information about ${searchTerm}. Include sections with headers for: Overview, History, Key Features or Characteristics, and Significance or Impact. Format in markdown with # headers. Include citations for major claims.`
                    }
                ],
                max_tokens: 4000,
                return_images: true,
                temperature: 0,
                search_recency_filter: "month",
                search_domain_filter: ["-wikipedia.org"]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Perplexity API error:", errorData);
            throw new Error("Failed to fetch from Perplexity API");
        }

        const data = await response.json();

        return NextResponse.json({
            content: data.choices[0].message.content,
            citations: []
        });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Failed to process search request" }, { status: 500 });
    }
}
