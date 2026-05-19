type WriterApplicationResponse = Record<string, unknown>;

type NudgeResponse = {
  creativeNudge: string;
  agentId: string;
  agentName: string;
};

type CreativeNudgeResult = {
  hasFinalOutput: boolean;
  status: string;
  creativeNudge?: string;
  raw?: unknown;
};

const WRITER_API_KEY = process.env.WRITER_API_KEY || "";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function getSuggestion(raw: WriterApplicationResponse) {
  return typeof raw.suggestion === "string" ? raw.suggestion :
    typeof raw.output === "string" ? raw.output :
    typeof raw.result === "string" ? raw.result :
    JSON.stringify(raw);
}

async function requestWriterApplication(appId: string, strategicInput: string) {
  const apiKey = WRITER_API_KEY || getRequiredEnv("WRITER_API_KEY");
  const response = await fetch(`https://api.writer.com/v1/applications/${appId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: [{ id: "Strategic Input", value: [strategicInput] }],
    }),
  });

  const raw = (await response.json()) as WriterApplicationResponse;

  if (!response.ok) {
    const errorMessage =
      typeof raw.error === "object" && raw.error !== null && "message" in raw.error
        ? String((raw.error as Record<string, unknown>).message)
        : String(raw.error || raw.detail || raw.message || `Writer API failed with status ${response.status}`);

    throw new Error(errorMessage);
  }

  return raw;
}

export async function requestBCANudge(strategicInput: string): Promise<NudgeResponse> {
  const raw = await requestWriterApplication(getRequiredEnv("WRITER_BCA_APP_ID"), strategicInput);

  return {
    creativeNudge: getSuggestion(raw),
    agentId: "BCA",
    agentName: "BCA Nudge",
  };
}

export async function requestOCNNudge(strategicInput: string): Promise<NudgeResponse> {
  const raw = await requestWriterApplication(getRequiredEnv("WRITER_OCN_APP_ID"), strategicInput);

  return {
    creativeNudge: getSuggestion(raw),
    agentId: "OCN",
    agentName: "OCN Nudge",
  };
}

export async function getCreativeNudgeResult(threadId: string): Promise<CreativeNudgeResult> {
  const apiKey = WRITER_API_KEY || getRequiredEnv("WRITER_API_KEY");
  const response = await fetch(`https://api.writer.com/v1/threads/${threadId}`, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  const raw = (await response.json()) as WriterApplicationResponse;

  if (!response.ok) {
    const errorMessage =
      typeof raw.error === "object" && raw.error !== null && "message" in raw.error
        ? String((raw.error as Record<string, unknown>).message)
        : String(raw.error || raw.detail || raw.message || `Writer API failed with status ${response.status}`);

    throw new Error(errorMessage);
  }

  const status = typeof raw.status === "string" ? raw.status : "unknown";
  const creativeNudge = getSuggestion(raw);

  return {
    hasFinalOutput: Boolean(creativeNudge),
    status,
    creativeNudge,
    raw,
  };
}
