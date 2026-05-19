"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type AnalyzeResponse = {
  creativeNudge?: string;
  agentId?: string;
  agentName?: string;
  error?: string;
};

async function safeJson(res: Response): Promise<AnalyzeResponse> {
  const text = await res.text();
  try {
    return JSON.parse(text) as AnalyzeResponse;
  } catch {
    return { error: text.trim() || `Server error (HTTP ${res.status})` };
  }
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [masterInput, setMasterInput] = useState("");
  const [masterError, setMasterError] = useState("");

  const [honInput, setHonInput] = useState("");
  const [honNudge, setHonNudge] = useState("");
  const [isHonAnalyzing, setIsHonAnalyzing] = useState(false);
  const [honError, setHonError] = useState("");
  const [isHonOpen, setIsHonOpen] = useState(true);

  const [dnInput, setDnInput] = useState("");
  const [dnNudge, setDnNudge] = useState("");
  const [isDnAnalyzing, setIsDnAnalyzing] = useState(false);
  const [dnError, setDnError] = useState("");
  const [isDnOpen, setIsDnOpen] = useState(false);

  const [tsInput, setTsInput] = useState("");
  const [tsNudge, setTsNudge] = useState("");
  const [isTsAnalyzing, setIsTsAnalyzing] = useState(false);
  const [tsError, setTsError] = useState("");
  const [isTsOpen, setIsTsOpen] = useState(false);

  const [bvcsInput, setBvcsInput] = useState("");
  const [bvcsNudge, setBvcsNudge] = useState("");
  const [isBvcsAnalyzing, setIsBvcsAnalyzing] = useState(false);
  const [bvcsError, setBvcsError] = useState("");
  const [isBvcsOpen, setIsBvcsOpen] = useState(false);

  const [tbicInput, setTbicInput] = useState("");
  const [tbicNudge, setTbicNudge] = useState("");
  const [isTbicAnalyzing, setIsTbicAnalyzing] = useState(false);
  const [tbicError, setTbicError] = useState("");
  const [isTbicOpen, setIsTbicOpen] = useState(false);

  const [soeInput, setSoeInput] = useState("");
  const [soeNudge, setSoeNudge] = useState("");
  const [isSoeAnalyzing, setIsSoeAnalyzing] = useState(false);
  const [soeError, setSoeError] = useState("");
  const [isSoeOpen, setIsSoeOpen] = useState(false);

  const [bpafInput, setBpafInput] = useState("");
  const [bpafNudge, setBpafNudge] = useState("");
  const [isBpafAnalyzing, setIsBpafAnalyzing] = useState(false);
  const [bpafError, setBpafError] = useState("");
  const [isBpafOpen, setIsBpafOpen] = useState(false);

  const [sogInput, setSogInput] = useState("");
  const [sogNudge, setSogNudge] = useState("");
  const [isSogAnalyzing, setIsSogAnalyzing] = useState(false);
  const [sogError, setSogError] = useState("");
  const [isSogOpen, setIsSogOpen] = useState(false);

  const [badInput, setBadInput] = useState("");
  const [badNudge, setBadNudge] = useState("");
  const [isBadAnalyzing, setIsBadAnalyzing] = useState(false);
  const [badError, setBadError] = useState("");
  const [isBadOpen, setIsBadOpen] = useState(false);

  const [rbcaInput, setRbcaInput] = useState("");
  const [rbcaNudge, setRbcaNudge] = useState("");
  const [isRbcaAnalyzing, setIsRbcaAnalyzing] = useState(false);
  const [rbcaError, setRbcaError] = useState("");
  const [isRbcaOpen, setIsRbcaOpen] = useState(false);

  const [smpInput, setSmpInput] = useState("");
  const [smpNudge, setSmpNudge] = useState("");
  const [isSmpAnalyzing, setIsSmpAnalyzing] = useState(false);
  const [smpError, setSmpError] = useState("");
  const [isSmpOpen, setIsSmpOpen] = useState(false);

  const [rtbInput, setRtbInput] = useState("");
  const [rtbNudge, setRtbNudge] = useState("");
  const [isRtbAnalyzing, setIsRtbAnalyzing] = useState(false);
  const [rtbError, setRtbError] = useState("");
  const [isRtbOpen, setIsRtbOpen] = useState(false);

  async function handleApplyToAll() {
    if (!masterInput.trim()) {
      setMasterError("Please enter a master campaign input before applying.");
      return;
    }
    setMasterError("");
    const val = masterInput.trim();
    setHonInput(val); setDnInput(val); setTsInput(val); setBvcsInput(val);
    setTbicInput(val); setSoeInput(val); setBpafInput(val); setSogInput(val);
    setBadInput(val); setRbcaInput(val); setSmpInput(val); setRtbInput(val);

    setIsGeneratingAll(true);
    setIsHonOpen(true); setHonNudge(""); setHonError("");
    setIsDnOpen(true);  setDnNudge("");  setDnError("");
    setIsTsOpen(true);  setTsNudge("");  setTsError("");
    setIsBvcsOpen(true); setBvcsNudge(""); setBvcsError("");
    setIsTbicOpen(true); setTbicNudge(""); setTbicError("");
    setIsSoeOpen(true); setSoeNudge(""); setSoeError("");
    setIsBpafOpen(true); setBpafNudge(""); setBpafError("");
    setIsSogOpen(true); setSogNudge(""); setSogError("");
    setIsBadOpen(true); setBadNudge(""); setBadError("");
    setIsRbcaOpen(true); setRbcaNudge(""); setRbcaError("");
    setIsSmpOpen(true); setSmpNudge(""); setSmpError("");
    setIsRtbOpen(true); setRtbNudge(""); setRtbError("");

    const agents = [
      { endpoint: "/api/analyze-hon",  setAnalyzing: setIsHonAnalyzing,  setNudge: setHonNudge,  setError: setHonError },
      { endpoint: "/api/analyze-dn",   setAnalyzing: setIsDnAnalyzing,   setNudge: setDnNudge,   setError: setDnError },
      { endpoint: "/api/analyze-ts",   setAnalyzing: setIsTsAnalyzing,   setNudge: setTsNudge,   setError: setTsError },
      { endpoint: "/api/analyze-bvcs", setAnalyzing: setIsBvcsAnalyzing, setNudge: setBvcsNudge, setError: setBvcsError },
      { endpoint: "/api/analyze-tbic", setAnalyzing: setIsTbicAnalyzing, setNudge: setTbicNudge, setError: setTbicError },
      { endpoint: "/api/analyze-soe",  setAnalyzing: setIsSoeAnalyzing,  setNudge: setSoeNudge,  setError: setSoeError },
      { endpoint: "/api/analyze-bpaf", setAnalyzing: setIsBpafAnalyzing, setNudge: setBpafNudge, setError: setBpafError },
      { endpoint: "/api/analyze",      setAnalyzing: setIsSogAnalyzing,  setNudge: setSogNudge,  setError: setSogError },
      { endpoint: "/api/analyze-bad",  setAnalyzing: setIsBadAnalyzing,  setNudge: setBadNudge,  setError: setBadError },
      { endpoint: "/api/analyze-rbca", setAnalyzing: setIsRbcaAnalyzing, setNudge: setRbcaNudge, setError: setRbcaError },
      { endpoint: "/api/analyze-smp",  setAnalyzing: setIsSmpAnalyzing,  setNudge: setSmpNudge,  setError: setSmpError },
      { endpoint: "/api/analyze-rtb",  setAnalyzing: setIsRtbAnalyzing,  setNudge: setRtbNudge,  setError: setRtbError },
    ];

    await Promise.all(agents.map(async ({ endpoint, setAnalyzing, setNudge, setError }) => {
      setAnalyzing(true);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ strategicInput: val }),
        });
        const payload = await safeJson(res);
        if (!res.ok) throw new Error(payload.error || "Unable to analyze input.");
        setNudge(payload.creativeNudge || "No response returned.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to analyze input.");
      } finally {
        setAnalyzing(false);
      }
    }));

    setIsGeneratingAll(false);
  }

  const hasHonOutput = !isHonAnalyzing && !honError && !!honNudge;
  const hasDnOutput = !isDnAnalyzing && !dnError && !!dnNudge;
  const hasTsOutput = !isTsAnalyzing && !tsError && !!tsNudge;
  const hasBvcsOutput = !isBvcsAnalyzing && !bvcsError && !!bvcsNudge;
  const hasTbicOutput = !isTbicAnalyzing && !tbicError && !!tbicNudge;
  const hasSoeOutput = !isSoeAnalyzing && !soeError && !!soeNudge;
  const hasBpafOutput = !isBpafAnalyzing && !bpafError && !!bpafNudge;
  const hasSogOutput = !isSogAnalyzing && !sogError && !!sogNudge;
  const hasBadOutput = !isBadAnalyzing && !badError && !!badNudge;
  const hasRbcaOutput = !isRbcaAnalyzing && !rbcaError && !!rbcaNudge;
  const hasSmpOutput = !isSmpAnalyzing && !smpError && !!smpNudge;
  const hasRtbOutput = !isRtbAnalyzing && !rtbError && !!rtbNudge;

  async function handleGenerateAll() {
    setIsGeneratingAll(true);

    setIsHonOpen(true); setHonNudge(""); setHonError("");
    setIsDnOpen(true);  setDnNudge("");  setDnError("");
    setIsTsOpen(true);  setTsNudge("");  setTsError("");
    setIsBvcsOpen(true); setBvcsNudge(""); setBvcsError("");
    setIsTbicOpen(true); setTbicNudge(""); setTbicError("");
    setIsSoeOpen(true); setSoeNudge(""); setSoeError("");
    setIsBpafOpen(true); setBpafNudge(""); setBpafError("");
    setIsSogOpen(true); setSogNudge(""); setSogError("");
    setIsBadOpen(true); setBadNudge(""); setBadError("");
    setIsRbcaOpen(true); setRbcaNudge(""); setRbcaError("");
    setIsSmpOpen(true); setSmpNudge(""); setSmpError("");
    setIsRtbOpen(true); setRtbNudge(""); setRtbError("");

    const agents = [
      { endpoint: "/api/analyze-hon",  input: honInput,  setAnalyzing: setIsHonAnalyzing,  setNudge: setHonNudge,  setError: setHonError },
      { endpoint: "/api/analyze-dn",   input: dnInput,   setAnalyzing: setIsDnAnalyzing,   setNudge: setDnNudge,   setError: setDnError },
      { endpoint: "/api/analyze-ts",   input: tsInput,   setAnalyzing: setIsTsAnalyzing,   setNudge: setTsNudge,   setError: setTsError },
      { endpoint: "/api/analyze-bvcs", input: bvcsInput, setAnalyzing: setIsBvcsAnalyzing, setNudge: setBvcsNudge, setError: setBvcsError },
      { endpoint: "/api/analyze-tbic", input: tbicInput, setAnalyzing: setIsTbicAnalyzing, setNudge: setTbicNudge, setError: setTbicError },
      { endpoint: "/api/analyze-soe",  input: soeInput,  setAnalyzing: setIsSoeAnalyzing,  setNudge: setSoeNudge,  setError: setSoeError },
      { endpoint: "/api/analyze-bpaf", input: bpafInput, setAnalyzing: setIsBpafAnalyzing, setNudge: setBpafNudge, setError: setBpafError },
      { endpoint: "/api/analyze",      input: sogInput,  setAnalyzing: setIsSogAnalyzing,  setNudge: setSogNudge,  setError: setSogError },
      { endpoint: "/api/analyze-bad",  input: badInput,  setAnalyzing: setIsBadAnalyzing,  setNudge: setBadNudge,  setError: setBadError },
      { endpoint: "/api/analyze-rbca", input: rbcaInput, setAnalyzing: setIsRbcaAnalyzing, setNudge: setRbcaNudge, setError: setRbcaError },
      { endpoint: "/api/analyze-smp",  input: smpInput,  setAnalyzing: setIsSmpAnalyzing,  setNudge: setSmpNudge,  setError: setSmpError },
      { endpoint: "/api/analyze-rtb",  input: rtbInput,  setAnalyzing: setIsRtbAnalyzing,  setNudge: setRtbNudge,  setError: setRtbError },
    ];

    await Promise.all(agents.map(async ({ endpoint, input, setAnalyzing, setNudge, setError }) => {
      if (!input.trim()) return;
      setAnalyzing(true);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ strategicInput: input.trim() }),
        });
        const payload = await safeJson(res);
        if (!res.ok) throw new Error(payload.error || "Unable to analyze input.");
        setNudge(payload.creativeNudge || "No response returned.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to analyze input.");
      } finally {
        setAnalyzing(false);
      }
    }));

    setIsGeneratingAll(false);
  }

  async function handleRtbAnalyze() {
    setIsRtbAnalyzing(true);
    setRtbError("");
    setRtbNudge("");
    try {
      const response = await fetch("/api/analyze-rtb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: rtbInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setRtbNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setRtbError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsRtbAnalyzing(false);
    }
  }

  async function handleSmpAnalyze() {
    setIsSmpAnalyzing(true);
    setSmpError("");
    setSmpNudge("");
    try {
      const response = await fetch("/api/analyze-smp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: smpInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setSmpNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setSmpError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsSmpAnalyzing(false);
    }
  }

  async function handleRbcaAnalyze() {
    setIsRbcaAnalyzing(true);
    setRbcaError("");
    setRbcaNudge("");
    try {
      const response = await fetch("/api/analyze-rbca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: rbcaInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setRbcaNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setRbcaError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsRbcaAnalyzing(false);
    }
  }

  async function handleBadAnalyze() {
    setIsBadAnalyzing(true);
    setBadError("");
    setBadNudge("");
    try {
      const response = await fetch("/api/analyze-bad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: badInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setBadNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setBadError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsBadAnalyzing(false);
    }
  }

  async function handleSogAnalyze() {
    setIsSogAnalyzing(true);
    setSogError("");
    setSogNudge("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: sogInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setSogNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setSogError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsSogAnalyzing(false);
    }
  }

  async function handleBpafAnalyze() {
    setIsBpafAnalyzing(true);
    setBpafError("");
    setBpafNudge("");
    try {
      const response = await fetch("/api/analyze-bpaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: bpafInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setBpafNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setBpafError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsBpafAnalyzing(false);
    }
  }

  async function handleSoeAnalyze() {
    setIsSoeAnalyzing(true);
    setSoeError("");
    setSoeNudge("");
    try {
      const response = await fetch("/api/analyze-soe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: soeInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setSoeNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setSoeError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsSoeAnalyzing(false);
    }
  }

  async function handleTbicAnalyze() {
    setIsTbicAnalyzing(true);
    setTbicError("");
    setTbicNudge("");
    try {
      const response = await fetch("/api/analyze-tbic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: tbicInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setTbicNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setTbicError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsTbicAnalyzing(false);
    }
  }

  async function handleBvcsAnalyze() {
    setIsBvcsAnalyzing(true);
    setBvcsError("");
    setBvcsNudge("");
    try {
      const response = await fetch("/api/analyze-bvcs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: bvcsInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setBvcsNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setBvcsError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsBvcsAnalyzing(false);
    }
  }

  async function handleTsAnalyze() {
    setIsTsAnalyzing(true);
    setTsError("");
    setTsNudge("");
    try {
      const response = await fetch("/api/analyze-ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: tsInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setTsNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setTsError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsTsAnalyzing(false);
    }
  }

  async function handleDnAnalyze() {
    setIsDnAnalyzing(true);
    setDnError("");
    setDnNudge("");
    try {
      const response = await fetch("/api/analyze-dn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: dnInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setDnNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setDnError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsDnAnalyzing(false);
    }
  }

  async function handleHonAnalyze() {
    setIsHonAnalyzing(true);
    setHonError("");
    setHonNudge("");
    try {
      const response = await fetch("/api/analyze-hon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategicInput: honInput }),
      });
      const payload = await safeJson(response);
      if (!response.ok) throw new Error(payload.error || "Unable to analyze input.");
      setHonNudge(payload.creativeNudge || "No response returned.");
    } catch (err) {
      setHonError(err instanceof Error ? err.message : "Unable to analyze input.");
    } finally {
      setIsHonAnalyzing(false);
    }
  }

  return (
    <div className="shell" data-theme={theme}>

      <nav className="topnav" aria-label="Site navigation">
        <div className="topnav-inner">
          <div className="nav-brand">
            <div className="nav-logo-box" aria-hidden="true"><span>X</span></div>
            <span className="nav-brand-name"><em>X</em>finity Creative Companion</span>
          </div>
          <div className="nav-right">
            <label className="theme-toggle">
              <span className="toggle-text">{theme === "dark" ? "Dark" : "Light"}</span>
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                aria-label="Toggle dark mode"
              />
              <span className="switch" aria-hidden="true" />
            </label>
          </div>
        </div>
      </nav>

      <main className="page-wrap">

        <section className="header-card header-card--hero" aria-labelledby="page-title">
          <h1 className="header-title--hero" id="page-title">Creative Collaborator Agent Ecosystem</h1>
          <p className="header-sub--hero">
            Riff on your vision and deliver on-brand, immersive, impactful and innovative creative output.
          </p>
        </section>

        <section className="master-input-panel" aria-label="Master Campaign Input">
          <label className="field-label master-input-label" htmlFor="master-input">Master Campaign Input</label>
          <textarea
            id="master-input"
            rows={4}
            value={masterInput}
            onChange={(e) => { setMasterInput(e.target.value); setMasterError(""); }}
            placeholder="Enter your master campaign brief here and click Apply to All to populate all 12 agents…"
          />
          {masterError && <p className="master-input-error" role="alert">{masterError}</p>}
          <button className="apply-all-btn" type="button" onClick={handleApplyToAll}>
            Apply to All
          </button>
        </section>

        <article className={`agent-card${isHonOpen ? " agent-card--open" : ""}`} aria-label="Human Override Agent">

          <button className="agent-card-header" onClick={() => setIsHonOpen(!isHonOpen)} aria-expanded={isHonOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CORE-11</div>
              <h2 className="card-title">Human Override</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer or creative strategist,<br />
                <strong>I want</strong> every nudge to be suggestive (not prescriptive) so I can accept, reject, or ignore recommendations,<br />
                <strong>So that</strong> I maintain creative control and the agent never blocks my forward progress.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Critical for user adoption</span>
                <span className="agent-tag">□ UX/product design</span>
                <span className="agent-tag agent-tag--badge">A4</span>
                <span className="agent-tag agent-tag--badge">A5</span>
              </div>
            </div>
            <div className={`agent-chevron${isHonOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isHonOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="hon-input">Input</label>
                <textarea
                  id="hon-input"
                  rows={4}
                  value={honInput}
                  onChange={(e) => setHonInput(e.target.value)}
                  placeholder="Enter a recommendation, nudge, or strategic direction to check for human creative control…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleHonAnalyze} disabled={isHonAnalyzing}>
                  {isHonAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasHonOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isHonAnalyzing ? "Generating" : hasHonOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isHonAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Checking for human override space…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isHonAnalyzing && honError && <p className="output-error" role="alert">{honError}</p>}
                {hasHonOutput && <div className="output-text output-markdown"><ReactMarkdown>{honNudge}</ReactMarkdown></div>}
                {!isHonAnalyzing && !honError && !honNudge && (
                  <p className="output-placeholder">Your human override nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isDnOpen ? " agent-card--open" : ""}`} aria-label="Distinctiveness Nudge Agent">

          <button className="agent-card-header" onClick={() => setIsDnOpen(!isDnOpen)} aria-expanded={isDnOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CORE-12</div>
              <h2 className="card-title">Distinctiveness Nudge (Anti-Slop)</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketing or creative leader,<br />
                <strong>I want</strong> CCA to detect and prevent generic, category-parity creative by nudging toward distinctiveness,<br />
                <strong>So that</strong> we never scale average work and always push toward brand-distinctive messaging.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Prevents scaling mediocre work</span>
                <span className="agent-tag">&lt;&gt; Palmyra pattern detection</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isDnOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isDnOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="dn-input">Input</label>
                <textarea
                  id="dn-input"
                  rows={4}
                  value={dnInput}
                  onChange={(e) => setDnInput(e.target.value)}
                  placeholder="Enter a creative direction or messaging idea to check for distinctiveness…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleDnAnalyze} disabled={isDnAnalyzing}>
                  {isDnAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasDnOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isDnAnalyzing ? "Generating" : hasDnOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isDnAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Checking for distinctiveness…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isDnAnalyzing && dnError && <p className="output-error" role="alert">{dnError}</p>}
                {hasDnOutput && <div className="output-text output-markdown"><ReactMarkdown>{dnNudge}</ReactMarkdown></div>}
                {!isDnAnalyzing && !dnError && !dnNudge && (
                  <p className="output-placeholder">Your distinctiveness nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isTsOpen ? " agent-card--open" : ""}`} aria-label="Thought-Starters Agent">

          <button className="agent-card-header" onClick={() => setIsTsOpen(!isTsOpen)} aria-expanded={isTsOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CORE-16</div>
              <h2 className="card-title">Thought-Starters, Not Content Generation</h2>
              <p className="agent-intro">
                <strong>As a</strong> creative or strategist,<br />
                <strong>I want</strong> the agent to generate thought-starters and creative provocations rather than finished content,<br />
                <strong>So that</strong> I stay in the driver's seat and the output sparks ideas rather than replacing them.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Preserves human creative ownership</span>
                <span className="agent-tag agent-tag--badge">A4</span>
              </div>
            </div>
            <div className={`agent-chevron${isTsOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isTsOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="ts-input">Input</label>
                <textarea
                  id="ts-input"
                  rows={4}
                  value={tsInput}
                  onChange={(e) => setTsInput(e.target.value)}
                  placeholder="Enter a strategic direction or brief to generate thought-starters…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleTsAnalyze} disabled={isTsAnalyzing}>
                  {isTsAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasTsOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isTsAnalyzing ? "Generating" : hasTsOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isTsAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Generating thought-starters…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isTsAnalyzing && tsError && <p className="output-error" role="alert">{tsError}</p>}
                {hasTsOutput && <div className="output-text output-markdown"><ReactMarkdown>{tsNudge}</ReactMarkdown></div>}
                {!isTsAnalyzing && !tsError && !tsNudge && (
                  <p className="output-placeholder">Your thought-starters will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isBvcsOpen ? " agent-card--open" : ""}`} aria-label="Business vs Communications Objective Separation Agent">

          <button className="agent-card-header" onClick={() => setIsBvcsOpen(!isBvcsOpen)} aria-expanded={isBvcsOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CORE-BVCS</div>
              <h2 className="card-title">Business vs Communications Objective Separation</h2>
              <p className="agent-intro">
                <strong>As a</strong> strategist or creative director,<br />
                <strong>I want</strong> the agent to distinguish between business objectives and communications objectives,<br />
                <strong>So that</strong> creative work is grounded in the right strategic layer.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Strategic clarity</span>
                <span className="agent-tag agent-tag--badge">A1</span>
              </div>
            </div>
            <div className={`agent-chevron${isBvcsOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isBvcsOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="bvcs-input">Input</label>
                <textarea
                  id="bvcs-input"
                  rows={4}
                  value={bvcsInput}
                  onChange={(e) => setBvcsInput(e.target.value)}
                  placeholder="Enter a brief or objective to separate business from communications goals…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleBvcsAnalyze} disabled={isBvcsAnalyzing}>
                  {isBvcsAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasBvcsOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isBvcsAnalyzing ? "Generating" : hasBvcsOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isBvcsAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Separating objectives…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isBvcsAnalyzing && bvcsError && <p className="output-error" role="alert">{bvcsError}</p>}
                {hasBvcsOutput && <div className="output-text output-markdown"><ReactMarkdown>{bvcsNudge}</ReactMarkdown></div>}
                {!isBvcsAnalyzing && !bvcsError && !bvcsNudge && (
                  <p className="output-placeholder">Your objective separation nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isTbicOpen ? " agent-card--open" : ""}`} aria-label="Tension-Based Insight Conversion Agent">

          <button className="agent-card-header" onClick={() => setIsTbicOpen(!isTbicOpen)} aria-expanded={isTbicOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CS-03</div>
              <h2 className="card-title">Tension-Based Insight Conversion</h2>
              <p className="agent-intro">
                <strong>As a</strong> creative strategist,<br />
                <strong>I want</strong> CCA to challenge "consumer fact" statements that lack tension and push me toward insights with genuine contradiction or surprise,<br />
                <strong>So that</strong> I develop insights with dramatic potential that drive compelling creative.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Core creative brief quality driver</span>
                <span className="agent-tag">&lt;&gt; Text analysis with Palmyra</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isTbicOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isTbicOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="tbic-input">Input</label>
                <textarea
                  id="tbic-input"
                  rows={4}
                  value={tbicInput}
                  onChange={(e) => setTbicInput(e.target.value)}
                  placeholder="Enter a consumer fact or insight statement to check for tension and dramatic potential…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleTbicAnalyze} disabled={isTbicAnalyzing}>
                  {isTbicAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasTbicOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isTbicAnalyzing ? "Generating" : hasTbicOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isTbicAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Finding the tension…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isTbicAnalyzing && tbicError && <p className="output-error" role="alert">{tbicError}</p>}
                {hasTbicOutput && <div className="output-text output-markdown"><ReactMarkdown>{tbicNudge}</ReactMarkdown></div>}
                {!isTbicAnalyzing && !tbicError && !tbicNudge && (
                  <p className="output-placeholder">Your tension-based insight will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isSoeOpen ? " agent-card--open" : ""}`} aria-label="Single Objective Enforcement Agent">

          <button className="agent-card-header" onClick={() => setIsSoeOpen(!isSoeOpen)} aria-expanded={isSoeOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-MKT-01</div>
              <h2 className="card-title">Single Objective Enforcement</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer,<br />
                <strong>I want</strong> CCA to detect and flag when my brief contains multiple competing objectives,<br />
                <strong>So that</strong> I'm pushed to simplify and create a more focused, actionable brief that drives better campaign performance.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Eliminates diluted briefs</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isSoeOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isSoeOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="soe-input">Input</label>
                <textarea
                  id="soe-input"
                  rows={4}
                  value={soeInput}
                  onChange={(e) => setSoeInput(e.target.value)}
                  placeholder="Enter your brief to check for multiple competing objectives…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleSoeAnalyze} disabled={isSoeAnalyzing}>
                  {isSoeAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasSoeOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isSoeAnalyzing ? "Generating" : hasSoeOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isSoeAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Checking for competing objectives…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isSoeAnalyzing && soeError && <p className="output-error" role="alert">{soeError}</p>}
                {hasSoeOutput && <div className="output-text output-markdown"><ReactMarkdown>{soeNudge}</ReactMarkdown></div>}
                {!isSoeAnalyzing && !soeError && !soeNudge && (
                  <p className="output-placeholder">Your objective enforcement nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isBpafOpen ? " agent-card--open" : ""}`} aria-label="Business Problem vs Activity Framing Agent">

          <button className="agent-card-header" onClick={() => setIsBpafOpen(!isBpafOpen)} aria-expanded={isBpafOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-MKT-02</div>
              <h2 className="card-title">Business Problem vs Activity Framing</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer,<br />
                <strong>I want</strong> CCA to challenge activity-oriented framing in my brief (e.g., "launch campaign"),<br />
                <strong>So that</strong> I articulate the underlying business problem and connect my work to measurable business outcomes.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Shifts from outputs to outcomes</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isBpafOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isBpafOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="bpaf-input">Input</label>
                <textarea
                  id="bpaf-input"
                  rows={4}
                  value={bpafInput}
                  onChange={(e) => setBpafInput(e.target.value)}
                  placeholder="Enter your brief to check if it's framed around a business problem or just an activity…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleBpafAnalyze} disabled={isBpafAnalyzing}>
                  {isBpafAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasBpafOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isBpafAnalyzing ? "Generating" : hasBpafOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isBpafAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Checking business problem framing…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isBpafAnalyzing && bpafError && <p className="output-error" role="alert">{bpafError}</p>}
                {hasBpafOutput && <div className="output-text output-markdown"><ReactMarkdown>{bpafNudge}</ReactMarkdown></div>}
                {!isBpafAnalyzing && !bpafError && !bpafNudge && (
                  <p className="output-placeholder">Your business framing nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isSogOpen ? " agent-card--open" : ""}`} aria-label="Source of Growth Identification Agent">

          <button className="agent-card-header" onClick={() => setIsSogOpen(!isSogOpen)} aria-expanded={isSogOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-MKT-03</div>
              <h2 className="card-title">Source of Growth Identification</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer,<br />
                <strong>I want</strong> CCA to prompt me to explicitly name where growth comes from (acquisition, retention, share-of-wallet, penetration),<br />
                <strong>So that</strong> my brief is grounded in a clear growth strategy that informs audience targeting and measurement.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Grounds briefs in strategy</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isSogOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isSogOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="sog-input">Input</label>
                <textarea
                  id="sog-input"
                  rows={4}
                  value={sogInput}
                  onChange={(e) => setSogInput(e.target.value)}
                  placeholder="Enter your brief to identify and clarify your source of growth…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleSogAnalyze} disabled={isSogAnalyzing}>
                  {isSogAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasSogOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isSogAnalyzing ? "Generating" : hasSogOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isSogAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Identifying source of growth…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isSogAnalyzing && sogError && <p className="output-error" role="alert">{sogError}</p>}
                {hasSogOutput && <div className="output-text output-markdown"><ReactMarkdown>{sogNudge}</ReactMarkdown></div>}
                {!isSogAnalyzing && !sogError && !sogNudge && (
                  <p className="output-placeholder">Your source of growth nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isBadOpen ? " agent-card--open" : ""}`} aria-label="Behavioral Audience Definition Agent">

          <button className="agent-card-header" onClick={() => setIsBadOpen(!isBadOpen)} aria-expanded={isBadOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-MKT-04</div>
              <h2 className="card-title">Behavioral Audience Definition</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer,<br />
                <strong>I want</strong> CCA to challenge demographic-only audience definitions and push me toward behavioral characteristics,<br />
                <strong>So that</strong> my targeting is based on motivations and behaviors that drive more relevant, higher-performing creative.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Drives relevance and performance</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isBadOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isBadOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="bad-input">Input</label>
                <textarea
                  id="bad-input"
                  rows={4}
                  value={badInput}
                  onChange={(e) => setBadInput(e.target.value)}
                  placeholder="Enter your audience definition to push beyond demographics toward behaviors…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleBadAnalyze} disabled={isBadAnalyzing}>
                  {isBadAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasBadOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isBadAnalyzing ? "Generating" : hasBadOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isBadAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Analyzing audience definition…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isBadAnalyzing && badError && <p className="output-error" role="alert">{badError}</p>}
                {hasBadOutput && <div className="output-text output-markdown"><ReactMarkdown>{badNudge}</ReactMarkdown></div>}
                {!isBadAnalyzing && !badError && !badNudge && (
                  <p className="output-placeholder">Your behavioral audience nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isRbcaOpen ? " agent-card--open" : ""}`} aria-label="Required Behavior Change Articulation Agent">

          <button className="agent-card-header" onClick={() => setIsRbcaOpen(!isRbcaOpen)} aria-expanded={isRbcaOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-MKT-05</div>
              <h2 className="card-title">Required Behavior Change Articulation</h2>
              <p className="agent-intro">
                <strong>As a</strong> marketer,<br />
                <strong>I want</strong> CCA to push me to define the specific, measurable customer behavior change my campaign must drive,<br />
                <strong>So that</strong> my brief is outcome-focused and actionable for the creative team, with clear success criteria.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Outcome-focused briefs</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isRbcaOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isRbcaOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="rbca-input">Input</label>
                <textarea
                  id="rbca-input"
                  rows={4}
                  value={rbcaInput}
                  onChange={(e) => setRbcaInput(e.target.value)}
                  placeholder="Enter your brief to define the specific behavior change your campaign must drive…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleRbcaAnalyze} disabled={isRbcaAnalyzing}>
                  {isRbcaAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasRbcaOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isRbcaAnalyzing ? "Generating" : hasRbcaOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isRbcaAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Articulating behavior change…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isRbcaAnalyzing && rbcaError && <p className="output-error" role="alert">{rbcaError}</p>}
                {hasRbcaOutput && <div className="output-text output-markdown"><ReactMarkdown>{rbcaNudge}</ReactMarkdown></div>}
                {!isRbcaAnalyzing && !rbcaError && !rbcaNudge && (
                  <p className="output-placeholder">Your behavior change nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isSmpOpen ? " agent-card--open" : ""}`} aria-label="Single-Minded Proposition Definition Agent">

          <button className="agent-card-header" onClick={() => setIsSmpOpen(!isSmpOpen)} aria-expanded={isSmpOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CS-04</div>
              <h2 className="card-title">Single-Minded Proposition Definition</h2>
              <p className="agent-intro">
                <strong>As a</strong> creative strategist,<br />
                <strong>I want</strong> CCA to stress-test my proposition for single-mindedness and flag when I'm trying to say too much,<br />
                <strong>So that</strong> I ensure one clear, focused message that the creative team can execute with impact.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Prevents "say too much" syndrome</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isSmpOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isSmpOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="smp-input">Input</label>
                <textarea
                  id="smp-input"
                  rows={4}
                  value={smpInput}
                  onChange={(e) => setSmpInput(e.target.value)}
                  placeholder="Enter your proposition to stress-test for single-mindedness…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleSmpAnalyze} disabled={isSmpAnalyzing}>
                  {isSmpAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasSmpOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isSmpAnalyzing ? "Generating" : hasSmpOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isSmpAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Testing proposition focus…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isSmpAnalyzing && smpError && <p className="output-error" role="alert">{smpError}</p>}
                {hasSmpOutput && <div className="output-text output-markdown"><ReactMarkdown>{smpNudge}</ReactMarkdown></div>}
                {!isSmpAnalyzing && !smpError && !smpNudge && (
                  <p className="output-placeholder">Your proposition nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <article className={`agent-card${isRtbOpen ? " agent-card--open" : ""}`} aria-label="RTB-to-Message Alignment Agent">

          <button className="agent-card-header" onClick={() => setIsRtbOpen(!isRtbOpen)} aria-expanded={isRtbOpen}>
            <div className="agent-card-header-left">
              <div className="agent-number">US-CS-05</div>
              <h2 className="card-title">RTB-to-Message Alignment</h2>
              <p className="agent-intro">
                <strong>As a</strong> creative strategist,<br />
                <strong>I want</strong> CCA to flag RTBs (reasons to believe) that don't ladder up to my main proposition,<br />
                <strong>So that</strong> I ensure tight message architecture where all supporting evidence reinforces the single-minded message.
              </p>
              <div className="agent-tags">
                <span className="agent-tag">◎ Ensures tight message architecture</span>
                <span className="agent-tag agent-tag--badge">A3</span>
              </div>
            </div>
            <div className={`agent-chevron${isRtbOpen ? " agent-chevron--open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {isRtbOpen && (
            <div className="agent-expand">
              <div className="expand-section">
                <label className="field-label" htmlFor="rtb-input">Input</label>
                <textarea
                  id="rtb-input"
                  rows={4}
                  value={rtbInput}
                  onChange={(e) => setRtbInput(e.target.value)}
                  placeholder="Enter your proposition and RTBs to check for message alignment…"
                />
              </div>
              <div className="expand-section--actions">
                <button className="generate-btn" type="button" onClick={handleRtbAnalyze} disabled={isRtbAnalyzing}>
                  {isRtbAnalyzing ? <><span className="spinner" aria-hidden="true" />Generating<span className="dots" aria-hidden="true"><span /><span /><span /></span></> : "Generate"}
                </button>
              </div>
              <div className="expand-section expand-section--output" aria-live="polite">
                <div className="output-header">
                  <span className="field-label">Output</span>
                  <div className="output-state">
                    <span className={`state-dot${hasRtbOutput ? " active" : ""}`} aria-hidden="true" />
                    <span>{isRtbAnalyzing ? "Generating" : hasRtbOutput ? "Ready" : "Waiting"}</span>
                  </div>
                </div>
                {isRtbAnalyzing && (
                  <div className="loading-wrap" role="status">
                    <div className="loading-top">
                      <span className="spinner" aria-hidden="true" />
                      <span className="loading-msg">Checking RTB alignment…</span>
                      <span className="dots" aria-hidden="true"><span /><span /><span /></span>
                    </div>
                    <div className="skels" aria-hidden="true">
                      <div className="skel" /><div className="skel" /><div className="skel" /><div className="skel" />
                    </div>
                  </div>
                )}
                {!isRtbAnalyzing && rtbError && <p className="output-error" role="alert">{rtbError}</p>}
                {hasRtbOutput && <div className="output-text output-markdown"><ReactMarkdown>{rtbNudge}</ReactMarkdown></div>}
                {!isRtbAnalyzing && !rtbError && !rtbNudge && (
                  <p className="output-placeholder">Your RTB alignment nudge will appear here.</p>
                )}
              </div>
            </div>
          )}

        </article>

        <section className="generate-all-panel" aria-label="Generate All Agents">
          <button
            className="generate-all-btn"
            type="button"
            onClick={handleGenerateAll}
            disabled={isGeneratingAll}
          >
            {isGeneratingAll ? (
              <><span className="spinner" aria-hidden="true" />Running All Agents<span className="dots" aria-hidden="true"><span /><span /><span /></span></>
            ) : "Generate Nudge"}
          </button>
        </section>

      </main>
    </div>
  );
}
