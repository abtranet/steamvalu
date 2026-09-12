import type { SVGProps } from "react";

/**
 * STEAM VALUE logo (public/steam-value-logo.svg): overlapping navy and cyan
 * hexagons around a target, with the wordmark. On dark backgrounds the navy
 * parts switch to off-white so the outline and "STEAM" stay legible. The
 * viewBox is cropped to the artwork so it fills its box like an image.
 */
export function SteamValueLogo({
  dark = false,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { dark?: boolean }) {
  const navy = dark ? "#f1f7fa" : "url(#sv-logo-navy)";
  const cyan = dark ? "#16cfea" : "url(#sv-logo-cyan)";
  const target = dark ? "#16cfea" : "#15bfe5";
  const subText = dark ? "#94a3b8" : "#425f78";

  return (
    <svg
      viewBox="120 30 2040 740"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="STEAM VALUE - DIGITAL TWIN PLATFORM"
      className={className}
      {...props}
    >
      {!dark && (
        <defs>
          <linearGradient id="sv-logo-navy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b4e93" />
            <stop offset="100%" stopColor="#082f68" />
          </linearGradient>
          <linearGradient id="sv-logo-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16cfea" />
            <stop offset="100%" stopColor="#12aeea" />
          </linearGradient>
        </defs>
      )}
      <g transform="translate(120,60)">
        <polygon points="290,0 540,145 540,435 290,580 40,435 40,145" stroke={navy} strokeWidth="34" strokeLinejoin="miter" />
        <polygon points="395,95 645,240 645,530 395,675 145,530 145,240" stroke={cyan} strokeWidth="34" strokeLinejoin="miter" />
        <circle cx="330" cy="355" r="72" fill="#123b69" />
        <circle cx="330" cy="355" r="74" stroke={target} strokeWidth="10" />
        <g stroke={target} strokeWidth="16" strokeLinecap="round">
          <line x1="330" y1="245" x2="330" y2="285" />
          <line x1="330" y1="425" x2="330" y2="465" />
          <line x1="220" y1="355" x2="260" y2="355" />
          <line x1="400" y1="355" x2="440" y2="355" />
        </g>
      </g>
      <g fontFamily="Arial, Helvetica, sans-serif">
        <text x="815" y="345" fontSize="190" fontWeight="800" fill={navy} letterSpacing="-5">
          STEAM
        </text>
        <text x="1475" y="345" fontSize="190" fontWeight="800" fill={cyan} letterSpacing="-5">
          VALUE
        </text>
        <text x="825" y="480" fontSize="70" fontWeight="400" fill={subText} letterSpacing="20">
          DIGITAL TWIN PLATFORM
        </text>
      </g>
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/**
 * STEAM VALUE mark (public/steam-value-mark.svg), cropped to the hexagons.
 * On dark backgrounds the navy hexagon switches to off-white.
 */
export function SteamValueMark({
  dark = true,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { dark?: boolean }) {
  const navy = dark ? "#f1f7fa" : "url(#sv-mark-navy)";
  const cyan = dark ? "#1ed5f0" : "url(#sv-mark-cyan)";
  return (
    <svg
      viewBox="188 112 738 834"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="STEAM VALUE Mark"
      className={className}
      {...props}
    >
      {!dark && (
        <defs>
          <linearGradient id="sv-mark-navy" x1="182" y1="154" x2="768" y2="710" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0b4e93" />
            <stop offset="1" stopColor="#082f68" />
          </linearGradient>
          <linearGradient id="sv-mark-cyan" x1="284" y1="278" x2="884" y2="850" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1ed5f0" />
            <stop offset="1" stopColor="#12b9ee" />
          </linearGradient>
        </defs>
      )}
      <polygon points="512,134 814,309 814,657 512,832 210,657 210,309" stroke={navy} strokeWidth="34" strokeLinejoin="miter" />
      <polygon points="602,226 904,401 904,749 602,924 300,749 300,401" stroke={cyan} strokeWidth="34" strokeLinejoin="miter" />
      <circle cx="560" cy="512" r="77" fill="#0a3c83" />
      <circle cx="560" cy="512" r="80" stroke="#18c8f0" strokeWidth="10" />
      <g stroke="#18c8f0" strokeWidth="18" strokeLinecap="round">
        <line x1="560" y1="374" x2="560" y2="432" />
        <line x1="560" y1="592" x2="560" y2="650" />
        <line x1="422" y1="512" x2="480" y2="512" />
        <line x1="640" y1="512" x2="698" y2="512" />
      </g>
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" />
    </svg>
  );
}

export function ChevronRightSmallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 10L8 6L4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 12L10 8L6 4" stroke="currentColor" />
    </svg>
  );
}

export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.146447 5.82843C0.240215 5.9222 0.367392 5.97488 0.5 5.97488C0.632608 5.97488 0.759785 5.9222 0.853554 5.82843L4.94982 1.73216L4.94912 4.76777C4.94912 4.83351 4.96206 4.89861 4.98722 4.95935C5.01238 5.02009 5.04926 5.07528 5.09575 5.12177C5.14224 5.16826 5.19742 5.20514 5.25816 5.23029C5.3189 5.25545 5.384 5.2684 5.44975 5.2684C5.51549 5.2684 5.58059 5.25545 5.64133 5.23029C5.70207 5.20514 5.75726 5.16826 5.80375 5.12177C5.85023 5.07528 5.88711 5.02009 5.91227 4.95935C5.93743 4.89861 5.95038 4.83351 5.95038 4.76777V0.52513C5.95046 0.459363 5.93757 0.394225 5.91244 0.333448C5.88731 0.272671 5.85044 0.217449 5.80393 0.170945C5.75743 0.12444 5.70221 0.0875669 5.64143 0.0624373C5.58065 0.0373076 5.51551 0.0244153 5.44975 0.0244984H1.20711C1.07433 0.0244984 0.946993 0.0772433 0.853107 0.17113C0.75922 0.265017 0.706475 0.392354 0.706475 0.52513C0.706475 0.657906 0.759221 0.785243 0.853107 0.87913C0.946994 0.973016 1.07433 1.02576 1.20711 1.02576L4.24272 1.02505L0.146447 5.12132C0.0526786 5.21509 0 5.34227 0 5.47488C0 5.60749 0.0526786 5.73466 0.146447 5.82843Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="17.293" width="1" height="24" transform="rotate(45 17.293 0)" fill="currentColor" />
      <rect
        x="0.292969"
        y="0.707031"
        width="1"
        height="24"
        transform="rotate(-45 0.292969 0.707031)"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 13l5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
