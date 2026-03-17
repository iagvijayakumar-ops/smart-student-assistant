import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   FONTS
───────────────────────────────────────────────────────────── */
const Fonts = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
const GlobalCSS = () => (
    <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #040508;
      --bg1:       #080b10;
      --bg2:       #0c1018;
      --surface:   rgba(12,16,24,0.85);
      --glass:     rgba(255,255,255,0.03);
      --border:    rgba(255,255,255,0.07);
      --borderHi:  rgba(100,255,160,0.25);
      --accent:    #3dffaa;
      --accentDim: rgba(61,255,170,0.08);
      --accentMid: rgba(61,255,170,0.18);
      --accentStr: rgba(61,255,170,0.35);
      --text:      #e2e8f0;
      --muted:     #4a5568;
      --muted2:    #718096;
      --warn:      #f6ad55;
      --danger:    #fc8181;
      --info:      #63b3ed;
      --purple:    #b794f4;
    }

    html, body { height: 100%; }

    body {
      font-family: 'Syne', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow: hidden;
    }

    .mono { font-family: 'JetBrains Mono', monospace; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    input, textarea, select {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 8px;
      padding: 10px 14px;
      width: 100%;
      outline: none;
      transition: all 0.2s;
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--accentStr);
      background: rgba(61,255,170,0.04);
      box-shadow: 0 0 0 3px var(--accentDim);
    }
    input::placeholder, textarea::placeholder { color: var(--muted); }

    select option { background: #0c1018; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes scanline { 0% { transform:translateY(-100%); } 100% { transform:translateY(100vh); } }
    @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
    @keyframes glow     { 0%,100% { box-shadow: 0 0 8px var(--accentStr); } 50% { box-shadow: 0 0 24px var(--accent), 0 0 48px var(--accentMid); } }
    @keyframes ticker   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes spin     { to { transform:rotate(360deg); } }
    @keyframes ripple   { 0% { transform:scale(0); opacity:0.6; } 100% { transform:scale(4); opacity:0; } }
    @keyframes blink    { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
    @keyframes slideIn  { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
    @keyframes shimmer  {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .fade-up  { animation: fadeUp  0.4s cubic-bezier(.16,1,.3,1) both; }
    .fade-in  { animation: fadeIn  0.3s ease both; }
    .slide-in { animation: slideIn 0.35s cubic-bezier(.16,1,.3,1) both; }

    .stagger-1 { animation-delay: 0.05s; }
    .stagger-2 { animation-delay: 0.10s; }
    .stagger-3 { animation-delay: 0.15s; }
    .stagger-4 { animation-delay: 0.20s; }
    .stagger-5 { animation-delay: 0.25s; }

    .glow-btn {
      animation: glow 3s ease-in-out infinite;
    }

    .shimmer-text {
      background: linear-gradient(90deg, var(--accent) 0%, #fff 40%, var(--accent) 60%, var(--purple) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 10px; font-weight: 600; padding: 2px 8px;
      border-radius: 20px; letter-spacing: 0.5px;
      text-transform: uppercase; white-space: nowrap;
      font-family: 'JetBrains Mono', monospace;
    }
    .tag-green  { background: rgba(61,255,170,0.1);  color: var(--accent); border: 1px solid rgba(61,255,170,0.2); }
    .tag-amber  { background: rgba(246,173,85,0.1);  color: var(--warn);   border: 1px solid rgba(246,173,85,0.2); }
    .tag-red    { background: rgba(252,129,129,0.1); color: var(--danger); border: 1px solid rgba(252,129,129,0.2); }
    .tag-blue   { background: rgba(99,179,237,0.1);  color: var(--info);   border: 1px solid rgba(99,179,237,0.2); }
    .tag-purple { background: rgba(183,148,244,0.1); color: var(--purple); border: 1px solid rgba(183,148,244,0.2); }
    .tag-gray   { background: rgba(255,255,255,0.05); color: var(--muted2); border: 1px solid var(--border); }

    .glass-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: border-color 0.2s, transform 0.2s;
    }
    .glass-card:hover {
      border-color: var(--borderHi);
    }

    .nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px; border-radius: 10px;
      border: 1px solid transparent;
      font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.18s;
      white-space: nowrap; overflow: hidden;
      background: transparent; color: var(--muted2);
      position: relative;
    }
    .nav-item:hover { color: var(--text); background: var(--glass); }
    .nav-item.active {
      color: var(--accent);
      background: var(--accentDim);
      border-color: var(--accentStr);
    }
    .nav-item.active::before {
      content: '';
      position: absolute; left: 0; top: 20%; height: 60%;
      width: 2px; border-radius: 2px;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent);
    }

    .cmd-input {
      background: rgba(61,255,170,0.04) !important;
      border: 1px solid var(--accentStr) !important;
      font-size: 14px !important;
      padding: 12px 18px !important;
      border-radius: 12px !important;
      color: var(--accent) !important;
      letter-spacing: 0.3px;
    }
    .cmd-input::placeholder { color: rgba(61,255,170,0.3) !important; }
    .cmd-input:focus {
      box-shadow: 0 0 0 3px var(--accentDim), 0 0 30px var(--accentDim) !important;
    }

    .dot-live {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 6px var(--accent);
      animation: pulse 2s ease-in-out infinite;
    }

    .progress-track {
      height: 3px; background: var(--border); border-radius: 2px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; border-radius: 2px;
      background: linear-gradient(90deg, var(--accent), var(--purple));
      transition: width 0.5s cubic-bezier(.16,1,.3,1);
    }

    button { cursor: pointer; font-family: 'Syne', sans-serif; }

    .stat-ring {
      position: relative; display: inline-flex;
      align-items: center; justify-content: center;
    }

    .task-row {
      display: flex; align-items: center; gap: 14px;
      padding: 12px 16px; border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--glass);
      transition: all 0.18s; cursor: pointer;
      margin-bottom: 6px;
    }
    .task-row:hover {
      border-color: var(--borderHi);
      background: rgba(61,255,170,0.03);
      transform: translateX(3px);
    }

    .ticker-wrap {
      overflow: hidden; white-space: nowrap;
    }
    .ticker-inner {
      display: inline-block;
      animation: ticker 30s linear infinite;
    }

    .grid-bg {
      background-image:
        linear-gradient(rgba(61,255,170,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(61,255,170,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .hexagon {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .ripple-container { position: relative; overflow: hidden; }
    .ripple-container::after {
      content: '';
      position: absolute; border-radius: 50%;
      background: rgba(61,255,170,0.3);
      width: 100px; height: 100px;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%) scale(0);
      pointer-events: none;
    }
    .ripple-container:active::after {
      animation: ripple 0.5s ease-out forwards;
    }

    .cursor-blink { animation: blink 1s step-end infinite; }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   CANVAS PARTICLE BACKGROUND
───────────────────────────────────────────────────────────── */
function ParticleCanvas() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let raf;

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.3,
            a: Math.random() * 0.5 + 0.1,
        }));

        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(61,255,170,${p.a})`;
                ctx.fill();
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(61,255,170,${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        }
        draw();
        const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
        window.addEventListener("resize", handleResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); };
    }, []);
    return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─────────────────────────────────────────────────────────────
   SCANLINE OVERLAY
───────────────────────────────────────────────────────────── */
function Scanline() {
    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
            <div style={{
                position: "absolute", left: 0, right: 0, height: 2,
                background: "linear-gradient(transparent, rgba(61,255,170,0.04), transparent)",
                animation: "scanline 8s linear infinite",
            }} />
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                pointerEvents: "none",
            }} />
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────── */
const TASKS = [
    { id: 1, title: "Submit DSA Assignment", due: "2026-03-19", priority: "high", status: "pending", subject: "CS301", progress: 65 },
    { id: 2, title: "Read Chapter 5 — DBMS", due: "2026-03-20", priority: "medium", status: "pending", subject: "CS205", progress: 30 },
    { id: 3, title: "OS Lab Report", due: "2026-03-18", priority: "high", status: "overdue", subject: "CS401", progress: 80 },
    { id: 4, title: "Math Tutorial Problems", due: "2026-03-22", priority: "low", status: "pending", subject: "MA101", progress: 10 },
    { id: 5, title: "Project Presentation", due: "2026-03-25", priority: "high", status: "completed", subject: "CS499", progress: 100 },
    { id: 6, title: "Physics Viva Prep", due: "2026-03-17", priority: "medium", status: "completed", subject: "PH201", progress: 100 },
];

const NOTICES = [
    { id: 1, title: "Exam Schedule Released", body: "Mid-semester exams start April 4. Check portal for timetable.", date: "2026-03-16", type: "exam" },
    { id: 2, title: "Hackathon Registration", body: "Register for TechFest 2026 before March 25. Team of 4 max.", date: "2026-03-15", type: "event" },
    { id: 3, title: "Lab Cancelled Tomorrow", body: "OS Lab on March 18 is cancelled. New date TBD.", date: "2026-03-14", type: "important" },
    { id: 4, title: "Library Fine Reminder", body: "Return overdue books by March 20 to avoid penalty.", date: "2026-03-13", type: "info" },
];

const CMD_RESPONSES = {
    "remind": "⚡ Reminder set! You'll get a WhatsApp ping 1 hour before the deadline.",
    "deadline": "📅 Extracting deadline… stored in Google Calendar + database.",
    "summary": "📊 Today: 3 tasks pending, 1 overdue, 2 notices unread.",
    "schedule": "🗓 Opening calendar view and syncing with Google Calendar…",
    "help": "💡 Try: 'remind me', 'show summary', 'add task', 'check deadline'",
    "add task": "✅ Task form opened! Fill in the details below.",
    "whatsapp": "📱 WhatsApp integration active. Sending test ping…",
};

const QUICK_CMDS = ["remind me", "show summary", "add task", "check deadline", "whatsapp status"];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function PTag({ p }) {
    const m = { high: ["tag-red", "■ HIGH"], medium: ["tag-amber", "▲ MED"], low: ["tag-gray", "▼ LOW"] };
    const [c, l] = m[p] || m.low;
    return <span className={`tag ${c}`}>{l}</span>;
}
function STag({ s }) {
    const m = { pending: ["tag-blue", "PENDING"], completed: ["tag-green", "DONE"], overdue: ["tag-red", "OVERDUE"] };
    const [c, l] = m[s] || ["tag-gray", s];
    return <span className={`tag ${c}`}>{l}</span>;
}

function Btn({ children, onClick, variant = "primary", small, style = {} }) {
    const base = {
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "'Syne',sans-serif", fontWeight: 600,
        borderRadius: 10, border: "none", cursor: "pointer",
        transition: "all 0.18s", fontSize: small ? 11 : 13,
        padding: small ? "5px 12px" : "10px 22px",
        letterSpacing: "0.3px",
    };
    const variants = {
        primary: { background: "var(--accent)", color: "#020a06", boxShadow: "0 0 20px var(--accentMid)" },
        outline: { background: "transparent", color: "var(--text)", border: "1px solid var(--border)" },
        ghost: { background: "transparent", color: "var(--muted2)", border: "none" },
        danger: { background: "rgba(252,129,129,0.1)", color: "var(--danger)", border: "1px solid rgba(252,129,129,0.2)" },
        accent: { background: "var(--accentDim)", color: "var(--accent)", border: "1px solid var(--accentStr)" },
    };
    return (
        <button className="ripple-container" onClick={onClick}
            style={{ ...base, ...variants[variant], ...style }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.filter = "brightness(1.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.filter = ""; }}>
            {children}
        </button>
    );
}

/* ─────────────────────────────────────────────────────────────
   RING CHART (SVG)
───────────────────────────────────────────────────────────── */
function RingChart({ value, max, color, size = 70, label }) {
    const r = (size / 2) - 8;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
                    strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)", filter: `drop-shadow(0 0 6px ${color})` }} />
                <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
                    style={{
                        transform: "rotate(90deg)", transformOrigin: `${size / 2}px ${size / 2}px`,
                        fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 500, fill: color
                    }}>
                    {value}
                </text>
            </svg>
            <span style={{ fontSize: 10, color: "var(--muted2)", letterSpacing: "0.5px", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   LIVE CLOCK
───────────────────────────────────────────────────────────── */
function LiveClock() {
    const [t, setT] = useState(new Date());
    useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
    const pad = n => String(n).padStart(2, "0");
    return (
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "2px" }}>
            {pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}
        </span>
    );
}

/* ─────────────────────────────────────────────────────────────
   AI COMMAND BAR
───────────────────────────────────────────────────────────── */
function CmdBar({ onNav }) {
    const [val, setVal] = useState("");
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    function run(cmd) {
        const q = cmd || val;
        if (!q.trim()) return;
        setLoading(true);
        setOutput(null);
        setTimeout(() => {
            const key = Object.keys(CMD_RESPONSES).find(k => q.toLowerCase().includes(k));
            setOutput(key ? CMD_RESPONSES[key] : `🤖 Processing: "${q}" — Sent to AI via n8n workflow!`);
            setLoading(false);
            if (q.toLowerCase().includes("add task")) onNav("tasks");
            if (q.toLowerCase().includes("schedule") || q.toLowerCase().includes("calendar")) onNav("calendar");
        }, 900);
        setVal("");
    }

    return (
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", background: "rgba(4,5,8,0.9)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: output || loading ? 10 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <div className="dot-live" />
                    <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "1px" }}>AI CMD</span>
                </div>
                <input ref={inputRef} className="cmd-input" value={val}
                    onChange={e => setVal(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && run()}
                    placeholder='type a command or ask anything... (try "remind me to submit assignment tomorrow 5pm")'
                    style={{ flex: 1 }} />
                <Btn small variant="accent" onClick={() => run()}>
                    {loading ? <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>◌</span> : "↵ RUN"}
                </Btn>
            </div>
            {(output || loading) && (
                <div className="mono fade-in" style={{
                    fontSize: 12, color: "var(--accent)", padding: "8px 14px",
                    background: "var(--accentDim)", borderRadius: 8,
                    border: "1px solid var(--accentStr)", letterSpacing: "0.3px"
                }}>
                    {loading ? <span>Processing<span className="cursor-blink">_</span></span> : output}
                </div>
            )}
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {QUICK_CMDS.map(c => (
                    <button key={c} onClick={() => run(c)} style={{
                        fontSize: 10, fontFamily: "'JetBrains Mono',monospace",
                        padding: "3px 10px", borderRadius: 20,
                        background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                        color: "var(--muted2)", cursor: "pointer", transition: "all 0.15s",
                        letterSpacing: "0.3px",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accentStr)"; e.currentTarget.style.color = "var(--accent)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted2)"; }}>
                        {c}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD PAGE
───────────────────────────────────────────────────────────── */
function DashboardPage({ tasks, notices, waNumber }) {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === "completed").length;
    const overdue = tasks.filter(t => t.status === "overdue").length;
    const pending = tasks.filter(t => t.status === "pending").length;
    const pct = Math.round((done / total) * 100) || 0;
    const urgent = tasks.filter(t => t.status !== "completed").slice(0, 4);

    const greet = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="fade-up grid-bg" style={{ minHeight: "100%", padding: "28px 32px" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
                <div>
                    <div style={{
                        fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)",
                        letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6
                    }}>
                        ◉ SYSTEM ONLINE · NEURAL ASSISTANT v2.4
                    </div>
                    <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>
                        <span className="shimmer-text">{greet()}</span>
                        <span style={{ color: "var(--text)" }}>, Student.</span>
                    </h1>
                    <p style={{ fontSize: 13, color: "var(--muted2)", marginTop: 6, fontFamily: "'JetBrains Mono',monospace" }}>
                        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                        <span style={{ marginLeft: 12, color: "var(--muted)" }}>·</span>
                        <span style={{ marginLeft: 12, color: overdue > 0 ? "var(--danger)" : "var(--accent)" }}>
                            {overdue > 0 ? `${overdue} OVERDUE — ATTENTION REQUIRED` : "ALL SYSTEMS NOMINAL"}
                        </span>
                    </p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <LiveClock />
                    <div style={{
                        fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace",
                        marginTop: 4, letterSpacing: "1px"
                    }}>IST · BANGALORE</div>
                </div>
            </div>

            {/* WA Banner */}
            {!waNumber ? (
                <div className="fade-up stagger-1" style={{
                    background: "rgba(246,173,85,0.06)", border: "1px solid rgba(246,173,85,0.25)",
                    borderRadius: 12, padding: "12px 18px", marginBottom: 24,
                    display: "flex", alignItems: "center", gap: 12
                }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--warn)", animation: "pulse 1.5s infinite" }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--warn)" }}>
                        ⚠ WhatsApp not linked — reminders inactive. Go to Settings → Connect number.
                    </span>
                </div>
            ) : (
                <div className="fade-up stagger-1" style={{
                    background: "var(--accentDim)", border: "1px solid var(--accentStr)",
                    borderRadius: 12, padding: "12px 18px", marginBottom: 24,
                    display: "flex", alignItems: "center", gap: 12
                }}>
                    <div className="dot-live" />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--accent)" }}>
                        ✓ WhatsApp live · +{waNumber} · n8n workflows armed · AI ready
                    </span>
                </div>
            )}

            {/* Stat rings */}
            <div className="glass-card fade-up stagger-2" style={{ padding: "24px 28px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px", marginBottom: 8 }}>
                        MISSION PROGRESS
                    </div>
                    <div style={{ fontSize: 42, fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: 4 }}>
                        {pct}<span style={{ fontSize: 20, color: "var(--muted2)" }}>%</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 12 }}>semester completion rate</div>
                    <div className="progress-track" style={{ width: 240 }}>
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    <RingChart value={total} max={total} color="#3dffaa" size={72} label="Total" />
                    <RingChart value={done} max={total} color="#3dffaa" size={72} label="Done" />
                    <RingChart value={pending} max={total} color="#63b3ed" size={72} label="Active" />
                    <RingChart value={overdue} max={total} color="#fc8181" size={72} label="Overdue" />
                </div>
            </div>

            {/* Two-col */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Task radar */}
                <div className="glass-card fade-up stagger-3" style={{ padding: "22px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px" }}>
                            ACTIVE TASKS
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fc8181" }} />
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f6ad55" }} />
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3dffaa" }} />
                        </div>
                    </div>
                    {urgent.map((t, i) => (
                        <div key={t.id} className="task-row fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                            <div style={{
                                width: 3, height: 36, borderRadius: 2,
                                background: t.status === "overdue" ? "var(--danger)" : t.priority === "high" ? "var(--warn)" : "var(--info)",
                                boxShadow: `0 0 8px ${t.status === "overdue" ? "var(--danger)" : t.priority === "high" ? "var(--warn)" : "var(--info)"}`,
                                flexShrink: 0,
                            }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{t.title}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 10, color: "var(--muted2)", fontFamily: "'JetBrains Mono',monospace" }}>
                                        {t.subject} · {t.due}
                                    </span>
                                    <div className="progress-track" style={{ flex: 1, maxWidth: 80 }}>
                                        <div className="progress-fill" style={{ width: `${t.progress}%` }} />
                                    </div>
                                    <span style={{ fontSize: 10, color: "var(--muted2)", fontFamily: "'JetBrains Mono',monospace" }}>{t.progress}%</span>
                                </div>
                            </div>
                            <STag s={t.status} />
                        </div>
                    ))}
                </div>

                {/* Notice feed */}
                <div className="glass-card fade-up stagger-4" style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px", marginBottom: 16 }}>
                        INTEL FEED
                    </div>
                    {notices.map((n, i) => {
                        const tc = { exam: "var(--danger)", event: "var(--info)", important: "var(--warn)", info: "var(--muted2)" };
                        return (
                            <div key={n.id} className="fade-up" style={{
                                animationDelay: `${i * 0.07}s`,
                                padding: "12px 0", borderBottom: "1px solid var(--border)", cursor: "pointer"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: tc[n.type], boxShadow: `0 0 6px ${tc[n.type]}` }} />
                                        <span style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</span>
                                    </div>
                                    <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{n.date}</span>
                                </div>
                                <p style={{ fontSize: 12, color: "var(--muted2)", lineHeight: 1.5, paddingLeft: 14 }}>{n.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Ticker */}
            <div style={{ marginTop: 20, padding: "10px 0", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
                <div className="ticker-inner mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "1.5px" }}>
                    {Array(4).fill(`◈ DSA DEADLINE: MAR 19  ◈  EXAMS: APR 4  ◈  HACKATHON: MAR 25  ◈  OS LAB CANCELLED  ◈  LIBRARY FINE DUE: MAR 20  ◈  AI ASSISTANT ONLINE  ◈  WHATSAPP INTEGRATION ACTIVE  ◈  n8n WORKFLOWS ARMED  `).join("")}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   TASKS PAGE
───────────────────────────────────────────────────────────── */
function TasksPage({ tasks, setTasks }) {
    const [filter, setFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", subject: "", due: "", priority: "medium", notes: "", progress: 0 });

    const filtered = tasks.filter(t => filter === "all" || t.status === filter);

    function addTask() {
        if (!form.title.trim()) return;
        setTasks(p => [...p, { id: Date.now(), ...form, status: "pending" }]);
        setForm({ title: "", subject: "", due: "", priority: "medium", notes: "", progress: 0 });
        setShowForm(false);
    }

    function toggleDone(id) {
        setTasks(p => p.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed", progress: t.status === "completed" ? t.progress : 100 } : t));
    }

    function del(id) { setTasks(p => p.filter(t => t.id !== id)); }

    const tabs = [
        { key: "all", label: "ALL", count: tasks.length },
        { key: "pending", label: "ACTIVE", count: tasks.filter(t => t.status === "pending").length },
        { key: "overdue", label: "OVERDUE", count: tasks.filter(t => t.status === "overdue").length },
        { key: "completed", label: "DONE", count: tasks.filter(t => t.status === "completed").length },
    ];

    return (
        <div className="fade-up" style={{ padding: "28px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 6 }}>
                        ◈ TASK CONTROL
                    </div>
                    <h2 style={{ fontSize: 26, fontWeight: 800 }}>Task Matrix</h2>
                    <p style={{ fontSize: 12, color: "var(--muted2)", fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
                        {tasks.filter(t => t.status !== "completed").length} active · {tasks.filter(t => t.status === "completed").length} resolved
                    </p>
                </div>
                <Btn onClick={() => setShowForm(v => !v)} variant="primary">
                    {showForm ? "✕ CANCEL" : "+ NEW TASK"}
                </Btn>
            </div>

            {showForm && (
                <div className="glass-card slide-in" style={{ padding: "24px", marginBottom: 20, borderColor: "var(--accentStr)" }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 20 }}>
                        ◉ INITIALISING NEW TASK
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                        {[
                            ["Task designation *", "title", "text", "Submit OS Assignment"],
                            ["Module / Subject", "subject", "text", "CS401"],
                        ].map(([label, key, type, ph]) => (
                            <div key={key}>
                                <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>{label}</label>
                                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} />
                            </div>
                        ))}
                        <div>
                            <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>DEADLINE</label>
                            <input type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>THREAT LEVEL</label>
                            <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                                <option value="high">■ HIGH</option>
                                <option value="medium">▲ MEDIUM</option>
                                <option value="low">▼ LOW</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>
                            INITIAL PROGRESS: {form.progress}%
                        </label>
                        <input type="range" min="0" max="100" value={form.progress} onChange={e => setForm(f => ({ ...f, progress: +e.target.value }))}
                            style={{ padding: 0, height: 4, accentColor: "var(--accent)" }} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>NOTES</label>
                        <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Additional context..." style={{ resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <Btn onClick={addTask} variant="primary">↵ COMMIT TASK</Btn>
                        <Btn variant="outline" onClick={() => setShowForm(false)}>ABORT</Btn>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {tabs.map(({ key, label, count }) => (
                    <button key={key} onClick={() => setFilter(key)} style={{
                        fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600,
                        padding: "6px 16px", borderRadius: 8, cursor: "pointer",
                        border: `1px solid ${filter === key ? "var(--accentStr)" : "var(--border)"}`,
                        background: filter === key ? "var(--accentDim)" : "transparent",
                        color: filter === key ? "var(--accent)" : "var(--muted2)",
                        letterSpacing: "1px", transition: "all 0.15s",
                    }}>{label} <span style={{ opacity: 0.6 }}>({count})</span></button>
                ))}
            </div>

            {/* Task list */}
            <div>
                {filtered.map((t, i) => (
                    <div key={t.id} className="task-row fade-up" style={{ animationDelay: `${i * 0.05}s`, marginBottom: 8 }}>
                        <div onClick={() => toggleDone(t.id)} style={{
                            width: 20, height: 20, borderRadius: 6, flexShrink: 0, cursor: "pointer",
                            border: `2px solid ${t.status === "completed" ? "var(--accent)" : "var(--border)"}`,
                            background: t.status === "completed" ? "var(--accent)" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s", boxShadow: t.status === "completed" ? "0 0 10px var(--accentMid)" : "none"
                        }}>
                            {t.status === "completed" && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#020a06" strokeWidth="2.2" strokeLinecap="round" /></svg>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: 13, fontWeight: 500, marginBottom: 4,
                                textDecoration: t.status === "completed" ? "line-through" : "none",
                                color: t.status === "completed" ? "var(--muted)" : "var(--text)"
                            }}>
                                {t.title}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span className="mono" style={{ fontSize: 10, color: "var(--muted2)" }}>{t.subject} · {t.due}</span>
                                <div className="progress-track" style={{ flex: 1, maxWidth: 100 }}>
                                    <div className="progress-fill" style={{ width: `${t.progress || 0}%` }} />
                                </div>
                                <span className="mono" style={{ fontSize: 10, color: "var(--muted2)" }}>{t.progress || 0}%</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <PTag p={t.priority} /><STag s={t.status} />
                            <button onClick={() => del(t.id)} style={{
                                background: "transparent", border: "none", color: "var(--muted)",
                                fontSize: 18, lineHeight: 1, cursor: "pointer", padding: "4px 6px", borderRadius: 6, transition: "color 0.15s"
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--danger)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>×</button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="glass-card" style={{ padding: "48px", textAlign: "center" }}>
                        <div className="mono" style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "2px" }}>NO RECORDS FOUND</div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   NOTICES PAGE
───────────────────────────────────────────────────────────── */
function NoticesPage({ notices, setNotices }) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", body: "", type: "info" });

    function add() {
        if (!form.title.trim()) return;
        setNotices(p => [{ id: Date.now(), ...form, date: new Date().toISOString().slice(0, 10) }, ...p]);
        setForm({ title: "", body: "", type: "info" });
        setShowForm(false);
    }

    const typeColors = { exam: "var(--danger)", event: "var(--info)", important: "var(--warn)", info: "var(--muted2)" };
    const typeMap = { exam: "tag-red", event: "tag-blue", important: "tag-amber", info: "tag-gray" };

    return (
        <div className="fade-up" style={{ padding: "28px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 6 }}>◈ INTEL BOARD</div>
                    <h2 style={{ fontSize: 26, fontWeight: 800 }}>Notice Feed</h2>
                </div>
                <Btn onClick={() => setShowForm(v => !v)}>+ BROADCAST</Btn>
            </div>

            {showForm && (
                <div className="glass-card slide-in" style={{ padding: "24px", marginBottom: 20, borderColor: "var(--accentStr)" }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 20 }}>◉ NEW BROADCAST</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, marginBottom: 14 }}>
                        <div>
                            <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>SUBJECT LINE</label>
                            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Notice title" />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>CLASSIFICATION</label>
                            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ width: 140 }}>
                                <option value="info">INFO</option>
                                <option value="exam">EXAM</option>
                                <option value="event">EVENT</option>
                                <option value="important">IMPORTANT</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>MESSAGE BODY</label>
                        <textarea rows={3} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Broadcast content..." style={{ resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <Btn onClick={add} variant="primary">↵ BROADCAST</Btn>
                        <Btn variant="outline" onClick={() => setShowForm(false)}>ABORT</Btn>
                    </div>
                </div>
            )}

            <div style={{ display: "grid", gap: 10 }}>
                {notices.map((n, i) => (
                    <div key={n.id} className="glass-card fade-up" style={{ animationDelay: `${i * 0.07}s`, padding: "20px 24px", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 3, height: 40, borderRadius: 2, background: typeColors[n.type], boxShadow: `0 0 8px ${typeColors[n.type]}`, flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{n.title}</div>
                                    <span className={`tag ${typeMap[n.type]}`}>{n.type.toUpperCase()}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                                <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{n.date}</span>
                                <button onClick={() => setNotices(p => p.filter(x => x.id !== n.id))} style={{
                                    background: "transparent", border: "none", color: "var(--muted)", fontSize: 18, cursor: "pointer", transition: "color 0.15s"
                                }}
                                    onMouseEnter={e => e.currentTarget.style.color = "var(--danger)"}
                                    onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>×</button>
                            </div>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--muted2)", lineHeight: 1.6, paddingLeft: 13 }}>{n.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   CALENDAR PAGE
───────────────────────────────────────────────────────────── */
function CalendarPage({ tasks }) {
    const today = new Date();
    const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() });
    const [sel, setSel] = useState(null);

    const first = new Date(cur.y, cur.m, 1).getDay();
    const days = new Date(cur.y, cur.m + 1, 0).getDate();
    const label = new Date(cur.y, cur.m).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

    function prev() { setCur(c => c.m === 0 ? { y: c.y - 1, m: 11 } : { ...c, m: c.m - 1 }); }
    function next() { setCur(c => c.m === 11 ? { y: c.y + 1, m: 0 } : { ...c, m: c.m + 1 }); }

    const byDate = {};
    tasks.forEach(t => { if (t.due) { if (!byDate[t.due]) byDate[t.due] = []; byDate[t.due].push(t); } });

    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);

    const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

    const selDate = sel ? `${cur.y}-${String(cur.m + 1).padStart(2, "0")}-${String(sel).padStart(2, "0")}` : null;
    const selTasks = selDate ? (byDate[selDate] || []) : [];

    return (
        <div className="fade-up" style={{ padding: "28px 32px", display: "flex", gap: 20 }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 6 }}>◈ TIME MATRIX</div>
                <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>Calendar</h2>

                <div className="glass-card" style={{ padding: "24px" }}>
                    {/* Month nav */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <button onClick={prev} style={{ background: "var(--glass)", border: "1px solid var(--border)", color: "var(--muted2)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 16, transition: "all 0.15s" }}>‹</button>
                        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "1px" }}>{label.toUpperCase()}</span>
                        <button onClick={next} style={{ background: "var(--glass)", border: "1px solid var(--border)", color: "var(--muted2)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 16, transition: "all 0.15s" }}>›</button>
                    </div>

                    {/* Day headers */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 4 }}>
                        {DAYS.map((d, i) => (
                            <div key={i} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", padding: "4px 0", letterSpacing: "1px" }}>{d}</div>
                        ))}
                    </div>

                    {/* Cells */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                        {cells.map((d, i) => {
                            if (!d) return <div key={i} />;
                            const ds = `${cur.y}-${String(cur.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                            const dt = byDate[ds] || [];
                            const isToday = d === today.getDate() && cur.m === today.getMonth() && cur.y === today.getFullYear();
                            const isSel = d === sel;
                            const hasHigh = dt.some(t => t.priority === "high");
                            const hasMed = dt.some(t => t.priority === "medium");
                            return (
                                <div key={i} onClick={() => setSel(d === sel ? null : d)} style={{
                                    minHeight: 56, borderRadius: 8, padding: "6px",
                                    background: isSel ? "var(--accentDim)" : isToday ? "rgba(61,255,170,0.05)" : "var(--glass)",
                                    border: `1px solid ${isSel ? "var(--accentStr)" : isToday ? "rgba(61,255,170,0.2)" : "var(--border)"}`,
                                    cursor: "pointer", transition: "all 0.15s",
                                    boxShadow: isToday ? "0 0 12px var(--accentDim)" : "none"
                                }}
                                    onMouseEnter={e => { if (!isSel && !isToday) e.currentTarget.style.borderColor = "var(--borderHi)"; }}
                                    onMouseLeave={e => { if (!isSel && !isToday) e.currentTarget.style.borderColor = isToday ? "rgba(61,255,170,0.2)" : "var(--border)"; }}>
                                    <div className="mono" style={{ fontSize: 11, fontWeight: isToday ? 700 : 400, color: isToday ? "var(--accent)" : isSel ? "var(--accent)" : "var(--muted2)", marginBottom: 4 }}>{d}</div>
                                    {dt.slice(0, 2).map(t => (
                                        <div key={t.id} style={{
                                            fontSize: 9, padding: "1px 4px", borderRadius: 3, marginBottom: 2,
                                            background: t.priority === "high" ? "rgba(252,129,129,0.15)" : t.priority === "medium" ? "rgba(246,173,85,0.12)" : "rgba(99,179,237,0.1)",
                                            color: t.priority === "high" ? "var(--danger)" : t.priority === "medium" ? "var(--warn)" : "var(--info)",
                                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            fontFamily: "'JetBrains Mono',monospace"
                                        }}>{t.title}</div>
                                    ))}
                                    {dt.length > 2 && <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>+{dt.length - 2}</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                    {[["High", "var(--danger)"], ["Medium", "var(--warn)"], ["Low", "var(--info)"], ["Today", "var(--accent)"]].map(([l, c]) => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: c, boxShadow: `0 0 4px ${c}` }} />
                            <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side panel */}
            <div style={{ width: 240, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px", marginBottom: 14, marginTop: 52 }}>
                    {sel ? `${String(cur.m + 1).padStart(2, "0")}/${String(sel).padStart(2, "0")}/${cur.y}` : "SELECT DATE"}
                </div>
                {sel ? (
                    selTasks.length > 0 ? selTasks.map(t => (
                        <div key={t.id} className="glass-card" style={{ padding: "14px 16px", marginBottom: 8 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><PTag p={t.priority} /><STag s={t.status} /></div>
                            <div className="progress-track" style={{ marginTop: 10 }}><div className="progress-fill" style={{ width: `${t.progress || 0}%` }} /></div>
                        </div>
                    )) : (
                        <div className="glass-card" style={{ padding: "24px 16px", textAlign: "center" }}>
                            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "1.5px" }}>NO TASKS</div>
                        </div>
                    )
                ) : (
                    <div className="glass-card" style={{ padding: "24px 16px", textAlign: "center" }}>
                        <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "1.5px" }}>CLICK A DATE</div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SETTINGS PAGE
───────────────────────────────────────────────────────────── */
function SettingsPage({ waNumber, setWaNumber }) {
    const [input, setInput] = useState(waNumber);
    const [saved, setSaved] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testOk, setTestOk] = useState(false);

    function save() {
        setWaNumber(input);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    function test() {
        setTesting(true);
        setTimeout(() => { setTesting(false); setTestOk(true); setTimeout(() => setTestOk(false), 3000); }, 1500);
    }

    return (
        <div className="fade-up" style={{ padding: "28px 32px" }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", letterSpacing: "2px", marginBottom: 6 }}>◈ SYSTEM CONFIG</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Settings</h2>

            {/* WhatsApp */}
            <div className="glass-card" style={{ padding: "28px", marginBottom: 16, borderColor: waNumber ? "var(--accentStr)" : "var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div className={waNumber ? "dot-live" : ""} style={!waNumber ? { width: 7, height: 7, borderRadius: "50%", background: "var(--muted)", flexShrink: 0 } : {}} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: waNumber ? "var(--accent)" : "var(--muted)", letterSpacing: "1.5px" }}>
                        WHATSAPP INTEGRATION · {waNumber ? "ONLINE" : "OFFLINE"}
                    </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 22, lineHeight: 1.6 }}>
                    Connect your WhatsApp to receive AI-powered reminders, deadline alerts, and smart replies — all without opening any app.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "flex-end", marginBottom: 18 }}>
                    <div>
                        <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>MOBILE NUMBER (WITH COUNTRY CODE)</label>
                        <input className="mono" value={input} onChange={e => setInput(e.target.value.replace(/\D/g, ""))}
                            placeholder="919876543210" style={{ letterSpacing: "2px", fontSize: 16 }} />
                        <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", marginTop: 5 }}>
                            No + or spaces. India: 91xxxxxxxxxx
                        </div>
                    </div>
                    <Btn onClick={save} variant="primary" style={{ marginBottom: 22 }}>
                        {saved ? "✓ SAVED" : "CONNECT"}
                    </Btn>
                </div>
                {waNumber && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "var(--accentDim)", borderRadius: 10, padding: "14px 18px", border: "1px solid var(--accentStr)"
                    }}>
                        <div>
                            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", marginBottom: 4, letterSpacing: "1px" }}>ACTIVE SESSION</div>
                            <div className="mono" style={{ fontSize: 16, color: "var(--accent)", letterSpacing: "2px" }}>+{waNumber}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <Btn small variant="accent" onClick={test}>
                                {testing ? <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>◌</span> : testOk ? "✓ SENT" : "PING TEST"}
                            </Btn>
                            <Btn small variant="danger" onClick={() => { setWaNumber(""); setInput(""); }}>DISCONNECT</Btn>
                        </div>
                    </div>
                )}
                {testOk && <div className="mono fade-in" style={{ marginTop: 10, fontSize: 11, color: "var(--accent)", padding: "8px 14px", background: "var(--accentDim)", borderRadius: 8, border: "1px solid var(--accentStr)" }}>
                    ✓ Test ping sent to +{waNumber} — check WhatsApp
                </div>}
            </div>

            {/* Notification toggles */}
            <div className="glass-card" style={{ padding: "24px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px", marginBottom: 18 }}>NOTIFICATION MATRIX</div>
                {[
                    ["Task deadline alerts", "1hr + 1day pre-warning via WhatsApp", true],
                    ["Notice broadcasts", "Instant push on new announcements", true],
                    ["Morning briefing (7:00 AM)", "Daily task + event digest", true],
                    ["AI reply confirmations", "Confirm when n8n workflow processes", false],
                    ["Overdue escalation", "Aggressive reminders for missed tasks", true],
                ].map(([l, d, def]) => <Toggle key={l} label={l} desc={d} defaultOn={def} />)}
            </div>

            {/* AI config */}
            <div className="glass-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1.5px", marginBottom: 18 }}>AI ENGINE CONFIG</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                        ["PRIMARY MODEL", "model", ["groq-llama:Groq — Llama 3 (FREE)", "openrouter:OpenRouter — Gemini Flash", "gpt4o-mini:GPT-4o Mini"]],
                        ["RESPONSE LANGUAGE", "lang", ["en:English", "hi:Hindi", "hi-en:Hinglish"]],
                    ].map(([label, key, opts]) => (
                        <div key={key}>
                            <label style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "var(--muted)", letterSpacing: "1px", display: "block", marginBottom: 6 }}>{label}</label>
                            <select defaultValue={opts[0].split(":")[0]}>
                                {opts.map(o => { const [v, l] = o.split(":"); return <option key={v} value={v}>{l}</option>; })}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Toggle({ label, desc, defaultOn = true }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 0", borderBottom: "1px solid var(--border)"
        }}>
            <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, letterSpacing: "0.5px" }}>{desc}</div>
            </div>
            <div onClick={() => setOn(v => !v)} style={{
                width: 40, height: 22, borderRadius: 11, cursor: "pointer",
                background: on ? "var(--accent)" : "var(--border)", transition: "background 0.25s",
                position: "relative", flexShrink: 0, marginLeft: 16,
                boxShadow: on ? "0 0 12px var(--accentMid)" : "none",
            }}>
                <div style={{
                    position: "absolute", top: 3, left: on ? 20 : 3,
                    width: 16, height: 16, borderRadius: "50%",
                    background: on ? "#020a06" : "var(--muted2)",
                    transition: "left 0.25s, background 0.25s",
                }} />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   NAV ICONS
───────────────────────────────────────────────────────────── */
function NavIcon({ id, active }) {
    const c = active ? "var(--accent)" : "var(--muted2)";
    const s = { width: 16, height: 16 };
    const icons = {
        dashboard: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
        tasks: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
        notices: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>,
        calendar: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
        settings: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    };
    return icons[id] || null;
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "tasks", label: "Tasks" },
    { id: "notices", label: "Notices" },
    { id: "calendar", label: "Calendar" },
    { id: "settings", label: "Settings" },
];

export default function App() {
    const [page, setPage] = useState("dashboard");
    const [tasks, setTasks] = useState(TASKS);
    const [notices, setNotices] = useState(NOTICES);
    const [waNumber, setWaNumber] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const pageMap = {
        dashboard: <DashboardPage tasks={tasks} notices={notices} waNumber={waNumber} />,
        tasks: <TasksPage tasks={tasks} setTasks={setTasks} />,
        notices: <NoticesPage notices={notices} setNotices={setNotices} />,
        calendar: <CalendarPage tasks={tasks} />,
        settings: <SettingsPage waNumber={waNumber} setWaNumber={setWaNumber} />,
    };

    return (
        <>
            <Fonts />
            <GlobalCSS />
            <ParticleCanvas />
            <Scanline />

            <div style={{ position: "relative", zIndex: 2, display: "flex", height: "100vh", overflow: "hidden" }}>

                {/* ── SIDEBAR ── */}
                <aside style={{
                    width: collapsed ? 64 : 220, flexShrink: 0,
                    background: "rgba(4,5,8,0.92)", backdropFilter: "blur(20px)",
                    borderRight: "1px solid var(--border)",
                    display: "flex", flexDirection: "column",
                    transition: "width 0.25s cubic-bezier(.16,1,.3,1)",
                    overflow: "hidden",
                }}>
                    {/* Logo */}
                    <div style={{
                        padding: "20px 16px", borderBottom: "1px solid var(--border)",
                        display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap"
                    }}>
                        <div className="glow-btn" style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#020a06" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                        </div>
                        {!collapsed && (
                            <div>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "var(--text)", lineHeight: 1 }}>StudyBot</div>
                                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--accent)", marginTop: 2, letterSpacing: "1px" }}>AI ASSISTANT v2.4</div>
                            </div>
                        )}
                    </div>

                    {/* Nav */}
                    <nav style={{ flex: 1, padding: "12px 8px" }}>
                        {NAV_ITEMS.map(({ id, label }) => (
                            <button key={id} className={`nav-item${page === id ? " active" : ""}`}
                                onClick={() => setPage(id)} style={{ width: "100%", marginBottom: 2 }}>
                                <NavIcon id={id} active={page === id} />
                                {!collapsed && label}
                            </button>
                        ))}
                    </nav>

                    {/* Status */}
                    {!collapsed && (
                        <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <div className="dot-live" />
                                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--accent)", letterSpacing: "1px" }}>SYSTEM ONLINE</span>
                            </div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--muted)", letterSpacing: "0.5px", lineHeight: 1.6 }}>
                                n8n ✓ · Supabase ✓<br />
                                {waNumber ? `WA +${waNumber.slice(-4).padStart(waNumber.length, "·")} ✓` : "WhatsApp ✗"}
                            </div>
                        </div>
                    )}

                    {/* Collapse toggle */}
                    <button onClick={() => setCollapsed(v => !v)} style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "12px", background: "transparent", border: "none",
                        borderTop: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer",
                        transition: "color 0.15s", fontSize: 16,
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
                        {collapsed ? "›" : "‹"}
                    </button>
                </aside>

                {/* ── MAIN ── */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                    {/* Top bar */}
                    <header style={{
                        height: 52, background: "rgba(4,5,8,0.9)", backdropFilter: "blur(20px)",
                        borderBottom: "1px solid var(--border)",
                        display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0
                    }}>
                        <div style={{ flex: 1, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
                            ◈ {page}
                        </div>
                        <LiveClock />
                        <div style={{ width: 1, height: 20, background: "var(--border)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div className="dot-live" style={{ width: 6, height: 6 }} />
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--muted2)" }}>
                                {waNumber ? `+${waNumber}` : "NOT LINKED"}
                            </span>
                        </div>
                        <div style={{
                            width: 30, height: 30, borderRadius: 8,
                            background: "var(--accentDim)", border: "1px solid var(--accentStr)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 800, fontSize: 12, color: "var(--accent)"
                        }}>S</div>
                    </header>

                    {/* AI Command Bar */}
                    <CmdBar onNav={setPage} />

                    {/* Page content */}
                    <main style={{ flex: 1, overflowY: "auto" }}>
                        {pageMap[page]}
                    </main>
                </div>
            </div>
        </>
    );
}