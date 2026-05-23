import { useState, useEffect } from "react";

const metrics = [
  {
    label: "TOTAL STAGES",
    value: "131",
    sub: "Process Steps",
    color: "#4FA8D3",
    glow: "rgba(79,168,211,0.6)",
    icon: "⚙️",
    bg: "linear-gradient(135deg,#0d2340,#1a3a5c)",
    border: "#4FA8D3",
  },
  {
    label: "SUB AREAS",
    value: "28",
    sub: "Operational Areas",
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.6)",
    icon: "🗂️",
    bg: "linear-gradient(135deg,#1a1800,#2d2a00)",
    border: "#C9A84C",
  },
  {
    label: "SUB GROUPS",
    value: "9",
    sub: "Departments",
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.6)",
    icon: "👥",
    bg: "linear-gradient(135deg,#1a1800,#2d2a00)",
    border: "#C9A84C",
  },
  {
    label: "MAX SLA",
    value: "7d",
    sub: "Hard Cap Limit",
    color: "#FFFFFF",
    glow: "rgba(255,255,255,0.4)",
    icon: "⏱️",
    bg: "linear-gradient(135deg,#0B1E3D,#1E3358)",
    border: "#7A8FA3",
  },
  {
    label: "DELAY THRESHOLD",
    value: "+2d",
    sub: "ON TIME + 2 Days",
    color: "#F39C12",
    glow: "rgba(243,156,18,0.6)",
    icon: "⚠️",
    bg: "linear-gradient(135deg,#1a0e00,#2d1a00)",
    border: "#F39C12",
  },
  {
    label: "EXCESS THRESHOLD",
    value: "+4d",
    sub: "ON TIME + 4 Days",
    color: "#E74C3C",
    glow: "rgba(231,76,60,0.6)",
    icon: "🔴",
    bg: "linear-gradient(135deg,#1a0000,#2d0000)",
    border: "#E74C3C",
  },
  {
    label: "KPI TARGET",
    value: "95%",
    sub: "On-Time Completion",
    color: "#27AE60",
    glow: "rgba(39,174,96,0.6)",
    icon: "🎯",
    bg: "linear-gradient(135deg,#001a0e,#002d1a)",
    border: "#27AE60",
  },
  {
    label: "KPI WARNING",
    value: "85%",
    sub: "Performance Alert",
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.6)",
    icon: "📊",
    bg: "linear-gradient(135deg,#1a1200,#2d1f00)",
    border: "#C9A84C",
  },
];

function AnimatedNumber({ target, duration = 1800, suffix = "" }) {
  const [current, setCurrent] = useState(0);
  const num = parseFloat(target.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCurrent(num); clearInterval(timer); }
      else setCurrent(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const display = target.includes("%")
    ? current + "%"
    : target.includes("+")
    ? "+" + current + "d"
    : target.includes("d")
    ? current + "d"
    : String(current);

  return <span>{display}</span>;
}

function Card3D({ metric, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const y = (e.clientX - rect.left - rect.width / 2) / rect.width;
    setRotX(-x * 18);
    setRotY(y * 18);
  };

  const handleLeave = () => {
    setHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        perspective: "800px",
        cursor: "pointer",
        animation: `fadeInUp 0.6s ease ${index * 0.08}s both`,
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) ${hovered ? "scale(1.06)" : "scale(1)"}`,
          transition: hovered ? "transform 0.1s ease" : "transform 0.5s ease",
          transformStyle: "preserve-3d",
          background: metric.bg,
          border: `1px solid ${metric.border}44`,
          borderRadius: "16px",
          padding: "22px 18px",
          position: "relative",
          overflow: "hidden",
          boxShadow: hovered
            ? `0 20px 60px ${metric.glow}, 0 0 30px ${metric.glow}, inset 0 1px 0 ${metric.border}66`
            : `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${metric.border}33`,
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: "2px",
          background: `linear-gradient(90deg, transparent, ${metric.border}, transparent)`,
          opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s",
        }} />

        {/* 3D side face effect */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "4px",
          background: `linear-gradient(180deg, ${metric.border}88, transparent)`,
          borderRadius: "0 16px 16px 0",
          transform: "translateZ(-2px)",
        }} />

        {/* Corner accent */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          width: "8px", height: "8px", borderRadius: "50%",
          background: metric.color,
          boxShadow: `0 0 8px ${metric.glow}`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }} />

        {/* Icon */}
        <div style={{ fontSize: "20px", marginBottom: "10px", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))" }}>
          {metric.icon}
        </div>

        {/* Label */}
        <div style={{
          fontSize: "9.5px", fontWeight: "700", letterSpacing: "1.8px",
          color: metric.border, marginBottom: "10px", textTransform: "uppercase",
          fontFamily: "Calibri, sans-serif",
          textShadow: `0 0 10px ${metric.glow}`,
        }}>
          {metric.label}
        </div>

        {/* Value */}
        <div style={{
          fontSize: "38px", fontWeight: "900", color: metric.color,
          lineHeight: 1, marginBottom: "8px",
          fontFamily: "Calibri, sans-serif",
          textShadow: `0 0 20px ${metric.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
          transform: hovered ? "translateZ(20px)" : "translateZ(0)",
          transition: "transform 0.3s",
        }}>
          <AnimatedNumber target={metric.value} />
        </div>

        {/* Sub label */}
        <div style={{
          fontSize: "10px", color: "#7A8FA3", letterSpacing: "0.5px",
          fontFamily: "Calibri, sans-serif",
        }}>
          {metric.sub}
        </div>

        {/* Bottom bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent, ${metric.border}, transparent)`,
          opacity: hovered ? 0.9 : 0.3, transition: "opacity 0.3s",
        }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060d1a 0%, #0B1E3D 50%, #060d1a 100%)",
      padding: "40px 24px",
      fontFamily: "Calibri, sans-serif",
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.6; } 50% { opacity: 1; }
        }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.8s ease both" }}>
        <div style={{
          display: "inline-block", padding: "6px 20px", marginBottom: "12px",
          border: "1px solid #C9A84C44", borderRadius: "20px",
          fontSize: "11px", color: "#C9A84C", letterSpacing: "3px",
          background: "rgba(201,168,76,0.06)",
        }}>
          SLA MANAGEMENT SYSTEM
        </div>
        <h1 style={{
          fontSize: "28px", fontWeight: "900", margin: "0 0 6px",
          color: "#FFFFFF", letterSpacing: "2px",
          textShadow: "0 0 30px rgba(201,168,76,0.4)",
        }}>
          SYSTEM CONTROL DASHBOARD
        </h1>
        <div style={{ width: "120px", height: "2px", margin: "0 auto", borderRadius: "2px",
          background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
        <p style={{ color: "#7A8FA3", fontSize: "12px", marginTop: "8px", letterSpacing: "1px" }}>
          Ahmed Fathi Hussein  ·  Project Owner  ·  2026
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        maxWidth: "1400px",
        margin: "0 auto 40px",
      }}>
        {metrics.map((m, i) => <Card3D key={i} metric={m} index={i} />)}
      </div>

      {/* SLA Timeline Bar */}
      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        background: "linear-gradient(135deg,#0d1a2e,#0B1E3D)",
        border: "1px solid #C9A84C33",
        borderRadius: "16px", padding: "24px 28px",
        animation: "fadeInUp 0.8s ease 0.7s both",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontSize: "10px", color: "#C9A84C", letterSpacing: "2.5px", marginBottom: "16px" }}>
          SLA PERFORMANCE THRESHOLD LINE
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0", position: "relative" }}>
          {/* ON TIME */}
          <div style={{ flex: 7, position: "relative" }}>
            <div style={{
              height: "12px", borderRadius: "6px 0 0 6px",
              background: "linear-gradient(90deg, #27AE60, #2ECC71)",
              boxShadow: "0 0 12px rgba(39,174,96,0.6)",
            }} />
            <div style={{ fontSize: "9px", color: "#27AE60", marginTop: "6px", textAlign: "center", letterSpacing: "1px" }}>
              ON TIME  ·  1–7 Days
            </div>
          </div>
          {/* DELAY */}
          <div style={{ flex: 2, position: "relative" }}>
            <div style={{
              height: "12px",
              background: "linear-gradient(90deg, #F39C12, #E67E22)",
              boxShadow: "0 0 12px rgba(243,156,18,0.6)",
            }} />
            <div style={{ fontSize: "9px", color: "#F39C12", marginTop: "6px", textAlign: "center", letterSpacing: "1px" }}>
              DELAY  ·  +2d
            </div>
          </div>
          {/* EXCESS */}
          <div style={{ flex: 2, position: "relative" }}>
            <div style={{
              height: "12px", borderRadius: "0 6px 6px 0",
              background: "linear-gradient(90deg, #E74C3C, #C0392B)",
              boxShadow: "0 0 12px rgba(231,76,60,0.6)",
            }} />
            <div style={{ fontSize: "9px", color: "#E74C3C", marginTop: "6px", textAlign: "center", letterSpacing: "1px" }}>
              EXCESS  ·  +4d
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: "20px", paddingTop: "16px",
          borderTop: "1px solid rgba(201,168,76,0.15)",
        }}>
          {[
            { label: "EXCELLENT", value: "≥ 95%", color: "#27AE60" },
            { label: "WARNING",   value: "85–94%", color: "#C9A84C" },
            { label: "CRITICAL",  value: "< 85%",  color: "#E74C3C" },
          ].map((k, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "18px", fontWeight: "900", color: k.color,
                textShadow: `0 0 12px ${k.color}88`,
              }}>{k.value}</div>
              <div style={{ fontSize: "9px", color: "#7A8FA3", letterSpacing: "1.5px", marginTop: "2px" }}>
                {k.label}
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#7A8FA3", letterSpacing: "1px" }}>TOTAL STAGES</div>
            <div style={{ fontSize: "22px", fontWeight: "900", color: "#4FA8D3", textShadow: "0 0 12px rgba(79,168,211,0.6)" }}>131</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#7A8FA3", letterSpacing: "1px" }}>MAX SLA CAP</div>
            <div style={{ fontSize: "22px", fontWeight: "900", color: "#FFFFFF", textShadow: "0 0 12px rgba(255,255,255,0.3)" }}>7 Days</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "24px", color: "#394a5a", fontSize: "10px", letterSpacing: "1.5px" }}>
        SHELTER PROCESS  ·  CUSTOMER ACCOUNT MANAGEMENT  ·  SLA V2.0
      </div>
    </div>
  );
}
