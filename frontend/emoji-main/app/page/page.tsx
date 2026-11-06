"use client"

import Link from 'next/link';

export default function Home() {
  
  const styles = {
    main: { minHeight: "100vh", display: "flex", flexDirection: "column" as const, backgroundColor: "#09090b", color: "#e4e4e7", fontFamily: "monospace" },
    navBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid #27272a" },
    logo: { padding: "0.75rem", color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" },
    navLinks: { display: "flex", gap: "1rem" },
    navItem: { padding: "0.5rem 1rem", backgroundColor: "#121214", borderRadius: "8px", color: "#e4e4e7", textDecoration: "none", border: "1px solid #27272a", fontSize: "0.875rem" },
    heroContainer: { display: "flex", justifyContent: "center", alignItems: "center", flex: 1 },
    heroContent: { maxWidth: "42rem", padding: "2.5rem", textAlign: "center" as const },
    statusTag: { fontSize: "1.25rem", fontWeight: "bold", color: "#10b981", marginBottom: "1.5rem" },
    heading: { fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem", lineHeight: "1.1" },
    grayText: { color: "#71717a" },
    redText: { color: "#ef4444" },
    para: { fontSize: "1.25rem", color: "#a1a1aa", marginBottom: "2rem", lineHeight: "1.6" },
    launchButton: { padding: "1rem 2rem", border: "1px solid #3f3f46", borderRadius: "8px", backgroundColor: "transparent", color: "#e4e4e7", cursor: "pointer", fontSize: "1rem", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "0.1em" },
    sectionTitle: { fontSize: "1.5rem", fontWeight: "bold", color: "#e4e4e7", marginBottom: "1rem" },
    cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", padding: "2rem", maxWidth: "1200px", margin: "0 auto" },
    card: { backgroundColor: "#121214", border: "1px solid #27272a", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" },
    cardTitle: { fontSize: "1.5rem", fontWeight: "bold", color: "#e4e4e7", marginBottom: "1rem" },
    cardText: { color: "#a1a1aa", marginBottom: "2rem", lineHeight: "1.5" },
    badgeRed: { fontSize: "0.75rem", color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "0.25rem 0.75rem", borderRadius: "999px", width: "fit-content", border: "1px solid rgba(239, 68, 68, 0.2)" },
    badgeOrange: { fontSize: "0.75rem", color: "#fb923c", backgroundColor: "rgba(249, 115, 22, 0.1)", padding: "0.25rem 0.75rem", borderRadius: "999px", width: "fit-content", border: "1px solid rgba(249, 115, 22, 0.2)" },
    badgeBlue: { fontSize: "0.75rem", color: "#60a5fa", backgroundColor: "rgba(59, 130, 246, 0.1)", padding: "0.25rem 0.75rem", borderRadius: "999px", width: "fit-content", border: "1px solid rgba(59, 130, 246, 0.2)" },
    footer: { textAlign: "center" as const, borderTop: "1px solid #27272a", padding: "1.5rem", color: "#71717a", marginTop: "4rem", fontSize: "0.875rem" }
  };

  return(
    <main style={styles.main}>
      
      
      <div style={styles.navBar}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={styles.logo}>Aegris</div>
        </Link> 
        
        <div style={styles.navLinks}>
          <Link href="/tool" style={styles.navItem}>Console</Link>
          <div style={styles.navItem}>History</div>
          <div style={styles.navItem}>Setting</div>
        </div>

        <div style={styles.navItem}>v2.0</div>
      </div>

      {/* Hero */}
      <div style={styles.heroContainer}>
        <div style={styles.heroContent}>
          <div style={styles.statusTag}>[ V2.0 is Live ]</div>
          <h1 style={styles.heading}>
            <span style={styles.grayText}>Automated</span> AI <span style={styles.redText}>Red-Teaming</span>
          </h1>
          <p style={styles.para}>
            AEGRIS uses advanced Emoji Smuggling and AI-driven analysis to bypass your LLM's guardrails, extract hidden system prompts, and prove exactly where your AI is vulnerable to data leaks.
          </p>
          <Link href="/">
            <button style={styles.launchButton}>Launch_Console</button>
          </Link>
        </div>
      </div>

      
      <div style={{ marginTop: "6rem" }}>
        <div style={styles.cardGrid}>
          
          <div style={styles.card}>
            <div>
              <p style={styles.cardTitle}>Deep_Detection</p>
              <p style={styles.cardText}>Bypass AI guardrails using advanced Emoji Smuggling and standard obfuscation. We test what standard scanners miss.</p>
            </div>
            <p style={styles.badgeRed}>OWASP LLM01</p>
          </div>

          <div style={styles.card}>
            <div>
              <p style={styles.cardTitle}>Prove</p>
              <p style={styles.cardText}>Get undeniable evidence with Canary Tokens and Regex Secret Scanning. If an API key leaks, we catch it.</p>
            </div>
            <p style={styles.badgeOrange}>REGEX / ENTROPY</p>
          </div>

          <div style={styles.card}>
            <div>
              <p style={styles.cardTitle}>AI_Judge</p>
              <p style={styles.cardText}>Receive executive summaries and severity scores generated by an independent local LLM.</p>
            </div>
            <p style={styles.badgeBlue}>LLM_JUDGE</p>
          </div>

        </div>
      </div>

      {/* How it works/how to use*/}
      <div style={{ marginTop: "6rem", padding: "0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
          
          <div style={{ backgroundColor: "#121214", border: "1px solid #27272a", padding: "2rem", borderRadius: "12px" }}>
            <h3 style={styles.sectionTitle}>How the Engine Works</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}><span style={styles.badgeBlue}>0.1.</span> Configure Target</p>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}><span style={styles.badgeBlue}>0.2.</span> Execute Attack</p>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}><span style={styles.badgeBlue}>0.3.</span> Review Report</p>
            </div>
          </div>

          <div style={{ backgroundColor: "#050505", border: "1px solid #27272a", padding: "2rem", borderRadius: "12px", fontSize: "0.875rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ color: "#a1a1aa" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>$</span> aegris scan --target https://api.client.com</p>
              <p style={{ color: "#60a5fa" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[+]</span> Initiating Go worker pool...</p>
              <p style={{ color: "#60a5fa" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[+]</span> Loading python mutation engine...</p>
              <p style={{ color: "#facc15" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[!]</span> Injecting Emoji Smuggling payload...</p>
              <p style={{ color: "#ef4444" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[Critical]</span> canary token detected in response</p>
              <p style={{ color: "#ef4444" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[Critical]</span> Leaked API Key: sk-proj-absd...</p>
              <p style={{ color: "#10b981" }}><span style={{ color: "#ef4444", marginRight: "0.5rem" }}>[?]</span> report generated by AI LLM</p>
            </div>
          </div>

        </div>
      </div>

      <footer style={styles.footer}>
        ©2026 Aegris. Built by Sable.D.kaze
      </footer>
       
    </main>
  )
}