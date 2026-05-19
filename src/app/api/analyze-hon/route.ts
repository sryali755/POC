import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WRITER_API_KEY = "wr-2b8489F2Kg6lWSqKjF0USw";
const WRITER_APP_ID = "0936de61-5dab-41da-b595-d517a1f12e00";

type AnalyzeRequest = {
  strategicInput?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequest;
    const strategicInput = typeof body.strategicInput === "string" ? body.strategicInput.trim() : "";

    if (!strategicInput) {
      return NextResponse.json({ error: "Strategic Input is required." }, { status: 400 });
    }

    const response = await fetch(`https://api.writer.com/v1/applications/${WRITER_APP_ID}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WRITER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [{ id: "Strategic Input", value: [strategicInput] }],
      }),
    });

    const responseText = await response.text();
    let raw: Record<string, unknown>;

    try {
      raw = JSON.parse(responseText) as Record<string, unknown>;
    } catch {
      raw = { message: responseText || `Writer API returned status ${response.status}` };
    }

    console.log("[ANALYZE-HON] Raw response:", JSON.stringify(raw, null, 2));

    if (!response.ok) {
      const errMsg =
        (typeof raw?.error === "object" && raw.error !== null && "message" in raw.error
          ? String((raw.error as Record<string, unknown>).message)
          : String(raw?.error || raw?.detail || raw?.message || `Writer API failed with status ${response.status}`));
      throw new Error(errMsg);
    }

    const suggestion =
      typeof raw?.suggestion === "string"
        ? raw.suggestion
        : typeof raw?.output === "string"
        ? raw.output
        : typeof raw?.result === "string"
        ? raw.result
        : JSON.stringify(raw);

    return NextResponse.json({
      creativeNudge: suggestion,
      agentId: "US-CORE-11",
      agentName: "Human Override",
    });
  } catch (error) {
    console.error("[ANALYZE-HON] Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to analyze Strategic Input." },
      { status: 500 },
    );
  }
}
