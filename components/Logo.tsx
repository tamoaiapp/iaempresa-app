interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const scales = { sm: 0.8, md: 1, lg: 1.4 };
  const s = scales[size];
  const h = Math.round(32 * s);
  const fontSize = Math.round(18 * s);
  const fontSizeSub = Math.round(13 * s);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(8 * s) }}>
      {/* Icon */}
      <svg width={h} height={h} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1"/>
            <stop offset="100%" stopColor="#a855f7"/>
          </linearGradient>
        </defs>
        <rect x="8" y="14" width="5" height="10" rx="1" fill="white" opacity="0.9"/>
        <rect x="14" y="10" width="5" height="14" rx="1" fill="white"/>
        <rect x="20" y="12" width="4" height="12" rx="1" fill="white" opacity="0.8"/>
        <circle cx="23" cy="8" r="3.5" fill="#fbbf24"/>
        <path d="M23 5.5 L23.6 7.2 L25.5 7.5 L24.1 8.8 L24.5 10.7 L23 9.7 L21.5 10.7 L21.9 8.8 L20.5 7.5 L22.4 7.2 Z" fill="white"/>
      </svg>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize,
          letterSpacing: "-0.5px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          iaempresa
        </span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          fontSize: fontSizeSub,
          color: "#8394b0",
          letterSpacing: "0.5px",
        }}>
          .app
        </span>
      </div>
    </div>
  );
}
