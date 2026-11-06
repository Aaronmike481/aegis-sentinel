"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [payload, setPayload] = useState("Ignore previous instructions");
  const [mode, setMode] = useState("direct");
  const [targetUrl, setTargetUrl] = useState("http://localhost:5000/chat");
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const fireAttack = async () => {
    setIsScanning(true);
    setLogs([`> [UI] Sending payload (Mode: ${mode})...`]);
    
    try {
      const res = await fetch("/api/attack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, mode, target_url: targetUrl })
      });

      if (!res.ok) throw new Error("Gateway rejected the request");

      const data = await res.json();
      const reqId = data.request_id;
      
      setLogs(prev => [...prev, `> [GATEWAY] 202 Accepted! ID: ${reqId.slice(0, 8)}...`, `> [GATEWAY] Processing in background...`]);

      const interval = setInterval(async () => {
        try {
            const statusRes = await fetch(`/api/status?id=${reqId}`);
            const statusData = await statusRes.json();

            if (statusData.status !== "QUEUED") {
                clearInterval(interval);
                setIsScanning(false);
                
                if (statusData.status === "BLOCKED") {
                    setLogs(prev => [...prev, 
                        `> [BLOCKED] Caught by ${statusData.result.layer}`,
                        `> [REASON] ${statusData.result.reason}`
                    ]);
                } else if (statusData.status === "FAILED") {
                    setLogs(prev => [...prev, `> [FAILED] AI Judge timed out.`]);
                } else if (statusData.status === "ALLOWED") {
                    setLogs(prev => [...prev, 
                        `> [ALLOWED] Attack passed all defenses.`,
                        `> [FORWARDING] Sending to Target AI...`
                    ]);
                    if (statusData.result?.target_response) {
                        setLogs(prev => [...prev, `> [TARGET AI] ${statusData.result.target_response}`]);
                    }
                }
            }
        } catch (e) {
            clearInterval(interval);
            setIsScanning(false);
        }
      }, 2000);

    } catch (error) {
      setIsScanning(false);
      setLogs(prev => [...prev, `> [ERROR] Could not connect to Gateway.`]);
    }
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#09090b", color: "#e4e4e7", padding: "2rem", fontFamily: "monospace" },
    wrapper: { maxWidth: "900px", margin: "0 auto" },
    topNav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid #27272a", maxWidth: "72rem", margin: "0 auto", marginBottom: "2rem" },
    logoLink: { textDecoration: "none", color: "#f4f4f5", fontSize: "1.5rem", fontWeight: "bold" },
    navGroup: { display: "flex", gap: "0.75rem", fontSize: "0.875rem" },
    navButton: { padding: "0.5rem 1rem", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "0.5rem", color: "#e4e4e7", textDecoration: "none", cursor: "pointer" },
    navButtonDisabled: { padding: "0.5rem 1rem", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "0.5rem", color: "#e4e4e7", opacity: 0.5, cursor: "not-allowed" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #27272a", paddingBottom: "1rem", marginBottom: "2rem" },
    title: { fontSize: "1.5rem", fontWeight: "bold", color: "#3b82f6", display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" },
    status: { display: "flex", alignItems: "center", gap: "8px", color: "#10b981", fontSize: "0.85rem", fontWeight: "bold" },
    statusDot: { width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" },
    panel: { backgroundColor: "#121214", border: "1px solid #27272a", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" },
    panelTitle: { fontSize: "1rem", color: "#e4e4e7", marginBottom: "1.5rem", fontWeight: "bold" },
    label: { display: "block", fontSize: "0.75rem", color: "#a1a1aa", textTransform: "uppercase" as const, marginBottom: "0.5rem", letterSpacing: "0.05em" },
    input: { width: "100%", backgroundColor: "#050505", border: "1px solid #27272a", color: "#e4e4e7", padding: "0.75rem", borderRadius: "6px", outline: "none", marginBottom: "1rem", fontFamily: "monospace" },
    inputRed: { width: "100%", backgroundColor: "#050505", border: "1px solid #27272a", color: "#f87171", padding: "0.75rem", borderRadius: "6px", outline: "none", marginBottom: "1rem", fontFamily: "monospace" },
    button: { width: "100%", padding: "1rem", borderRadius: "6px", fontWeight: "bold", border: "none", cursor: "pointer", transition: "0.2s", backgroundColor: isScanning ? "#27272a" : "#dc2626", color: isScanning ? "#71717a" : "#ffffff" },
    logsContainer: { backgroundColor: "#050505", border: "1px solid #27272a", borderRadius: "12px", overflow: "hidden" },
    logsHeader: { backgroundColor: "#121214", padding: "0.75rem 1rem", borderBottom: "1px solid #27272a", fontSize: "0.75rem", fontWeight: "bold", color: "#a1a1aa" },
    logsBody: { padding: "1rem", height: "400px", overflowY: "auto" as const },
    logLine: (log: string) => ({
      marginBottom: "0.5rem",
      color: log.includes("BLOCKED") ? "#ef4444" : log.includes("ALLOWED") || log.includes("TARGET AI") ? "#10b981" : "#a1a1aa",
      fontWeight: log.includes("BLOCKED") || log.includes("ALLOWED") ? "bold" : "normal"
    })
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.topNav}>
        <Link href="/" style={styles.logoLink}>
            AEGRIS
        </Link>
        
        <div style={styles.navGroup}>
          <Link href="/tool" style={styles.navButton}>
            Console
          </Link>
          <button style={styles.navButtonDisabled}>
            History
          </button>
          <button style={styles.navButtonDisabled}>
            Settings
          </button>
        </div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.header}>
           <Link href="/" style={styles.title}>
                <span style={{ fontSize: "1.5rem" }}>🛡️</span> AEGRIS SENTINEL
            </Link>
            <div style={styles.status}>
                <span style={styles.statusDot}></span>
                ENGINE ONLINE
            </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Target Configuration</h2>
          
          <label style={styles.label}>Target AI URL</label>
          <input 
            style={styles.input} 
            value={targetUrl} 
            onChange={(e) => setTargetUrl(e.target.value)} 
          />

          <label style={styles.label}>Attack Mode</label>
          <select 
            style={styles.input} 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="direct">Direct Attack (Test Defenses)</option>
            <option value="base64">Base64 Encode (Bypass Regex)</option>
            <option value="emoji">Emoji Smuggle (Test GlyphGuard)</option>
          </select>

          <label style={styles.label}>Attack Payload</label>
          <input 
            style={styles.inputRed} 
            value={payload} 
            onChange={(e) => setPayload(e.target.value)} 
          />

          <button 
            style={styles.button} 
            onClick={fireAttack} 
            disabled={isScanning}
          >
            {isScanning ? "PROCESSING..." : "FIRE ATTACK"}
          </button>
        </div>

        <div style={styles.logsContainer}>
          <div style={styles.logsHeader}>LIVE SECURITY LOGS</div>
          <div style={styles.logsBody}>
            {logs.length === 0 && <div style={{ color: "#52525b", fontStyle: "italic" }}>Waiting for attack...</div>}
            {logs.map((log, i) => (
                <div key={i} style={styles.logLine(log)}>
                    {log}
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}