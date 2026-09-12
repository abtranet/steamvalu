import type { SVGProps } from "react";

/**
 * STEAM VALUE wordmark. "STEAM" and the mark outline are white on dark
 * backgrounds, navy on light ones; "VALUE" and the mark accent use the site
 * green (--brand). Set in the rounded geometric wordmark font (Poppins).
 */
export function SteamValueLogo({
  dark = false,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { dark?: boolean }) {
  const outerHex = dark ? "#f1f7fa" : "#0d4a72";
  const cyan = dark ? "#00c0e8" : "#06bed4";
  const valueCyan = dark ? "#00c0e8" : "#06aecd";
  const nodeFill = dark ? "#0a3346" : "#10283d";
  const steamText = dark ? "#f1f7fa" : "#0d4a72";
  const subText = dark ? "#94a3b8" : "#647b8d";

  return (
    <svg
      viewBox="0 0 840 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="STEAM VALUE - DIGITAL TWIN PLATFORM"
      className={className}
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M116 22 202 72v100l-86 50-86-50V72Z"
          stroke={outerHex}
          strokeWidth="11"
          style={{ transition: "stroke 0.3s ease" }}
        />
        <path
          d="m154 58 88 51v101l-88 51-88-51V109Z"
          stroke={cyan}
          strokeWidth="9"
          style={{ transition: "stroke 0.3s ease" }}
        />
        <path
          d="M116 91v26m0 52v26M78 143h25m26 0h25"
          stroke={cyan}
          strokeWidth="8"
          style={{ transition: "stroke 0.3s ease" }}
        />
      </g>
      <circle
        cx="116"
        cy="143"
        r="24"
        fill={nodeFill}
        stroke={cyan}
        strokeWidth="4"
        style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
      />
      <g fontFamily="var(--font-poppins), Arial, Helvetica, sans-serif">
        <text
          x="294"
          y="128"
          fill={steamText}
          fontSize="58"
          fontWeight="700"
          letterSpacing="2"
          style={{ transition: "fill 0.3s ease" }}
        >
          STEAM
        </text>
        <text
          x="530"
          y="128"
          fill={valueCyan}
          fontSize="58"
          fontWeight="700"
          letterSpacing="2"
          style={{ transition: "fill 0.3s ease" }}
        >
          VALUE
        </text>
        <text
          x="297"
          y="176"
          fill={subText}
          fontSize="18"
          fontWeight="500"
          letterSpacing="8"
          style={{ transition: "fill 0.3s ease" }}
        >
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

export function SteamValueMark({
  dark = true,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { dark?: boolean }) {
  const steam = dark ? "#f1f7fa" : "#0d4a72";
  const green = dark ? "var(--brand, #3afc97)" : "#047857";
  const node = dark ? "#0a3346" : "#10283d";
  return (
    <svg
      viewBox="10 12 232 258"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="STEAM VALUE Mark"
      className={className}
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="m106 22 86 50v100l-86 50-86-50V72Z"
          stroke={steam}
          strokeWidth={dark ? 14 : 16}
          style={{ transition: "stroke 0.3s ease" }}
        />
        <path
          d="m144 58 88 51v101l-88 51-88-51V109Z"
          stroke={green}
          strokeWidth={dark ? 12 : 14}
          style={{ transition: "stroke 0.3s ease" }}
        />
        <path
          d="M106 91v26m0 52v26M68 143h25m26 0h25"
          stroke={green}
          strokeWidth={dark ? 10 : 12}
          style={{ transition: "stroke 0.3s ease" }}
        />
      </g>
      <circle
        cx="106"
        cy="143"
        r="24"
        fill={node}
        stroke={green}
        strokeWidth={dark ? 5 : 6}
        style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
      />
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
