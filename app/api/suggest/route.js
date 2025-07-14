import { NextResponse } from "next/server";
import { DOMParser } from 'xmldom';

// Helper to fetch XML suggestions and extract keywords
async function fetchSuggestions(query) {
	const apiUrl = `https://google.com/complete/search?output=toolbar&q=${encodeURIComponent(query)}`;
	const res = await fetch(apiUrl);
	const xml = await res.text();

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "text/xml");

	const suggestionNodes = xmlDoc.getElementsByTagName("suggestion");
	return Array.from(suggestionNodes).map((node) => node.getAttribute("data"));
}

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const seed = searchParams.get("q");

		if (!seed) {
			return NextResponse.json(
				{ success: false, msg: "Missing query parameter 'q'" },
				{ status: 400 }
			);
		}

		// Step 1: Fetch initial suggestions
		const initialSuggestions = await fetchSuggestions(seed);

		// Step 2: Fetch deeper suggestions for each top suggestion (limit 2)
		const allSuggestions = new Set(initialSuggestions);

		// Limit depth and requests
		const subSuggestionsPromises = initialSuggestions.map(async (keyword) => {
			const subs = await fetchSuggestions(keyword);
			return subs.slice(0, 2); // Limit to 2 per keyword
		});

		const subResults = await Promise.allSettled(subSuggestionsPromises);

		subResults.forEach((result) => {
			if (result.status === "fulfilled") {
				result.value.forEach((s) => allSuggestions.add(s));
			}
		});

		// Final output
		return NextResponse.json({
			success: true,
			suggestions: Array.from(allSuggestions),
		});
	} catch (error) {
		console.error("Suggestion API error:", error);
		return NextResponse.json(
			{ success: false, msg: "Internal server error" },
			{ status: 500 }
		);
	}
}
