import Link from "next/link";

type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
  linked?: boolean;
};

function Mark({ light = false }: { light?: boolean }) {
  const stroke = light ? "#FFFFFF" : "#101827";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 54 54"
      className="brand-symbol"
      fill="none"
    >
      <defs>
        <linearGradient id="bc-gradient" x1="7" y1="5" x2="47" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#36D5F5" />
          <stop offset=".52" stopColor="#1769FF" />
          <stop offset="1" stopColor="#875CFF" />
        </linearGradient>
      </defs>
      <path d="M31.6 7.5H19.2C11.9 7.5 6 13.4 6 20.7v12.6c0 7.3 5.9 13.2 13.2 13.2h12.4" stroke="url(#bc-gradient)" strokeWidth="5.2" strokeLinecap="round"/>
      <path d="M22.5 17.2h12.1c5.3 0 9.6 3.2 9.6 7.2s-4.3 7.2-9.6 7.2H22.5V17.2Z" stroke={stroke} strokeWidth="4.4" strokeLinejoin="round"/>
      <path d="M22.5 31.6h13.2c5.8 0 10.4 3.4 10.4 7.6s-4.6 7.6-10.4 7.6H22.5V31.6Z" stroke={stroke} strokeWidth="4.4" strokeLinejoin="round"/>
      <path d="M7.5 27h12" stroke="url(#bc-gradient)" strokeWidth="4.2" strokeLinecap="round"/>
    </svg>
  );
}

export function BrandMark({ light = false, compact = false, linked = true }: BrandMarkProps) {
  const content = (
    <span className={`brand-lockup ${light ? "brand-lockup-light" : ""} ${compact ? "brand-lockup-compact" : ""}`}>
      <Mark light={light} />
      {!compact && (
        <span className="brand-wording">
          <span className="brand-name">BC <b>LABS</b><i>.</i></span>
          <span className="brand-subtitle">&amp; CONSULTANCY</span>
        </span>
      )}
    </span>
  );

  return linked ? <Link href="/" aria-label="BC Labs home" className="brand-link">{content}</Link> : content;
}
