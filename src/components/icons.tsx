import type { SVGProps } from "react";

export function IconStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3.5l2.8 5.7 6.3.9-4.6 4.5 1.1 6.3L12 17.8l-5.6 3 1.1-6.3L2.9 10l6.3-.9L12 3.5z" />
    </svg>
  );
}

export function IconSeat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M7 5.5c0-1.4 1.1-2.5 2.5-2.5h1c1.4 0 2.5 1.1 2.5 2.5v3.5H7V5.5z"
        strokeWidth="1.5"
      />
      <path
        d="M6 11h10c1.1 0 2 .9 2 2v6"
        strokeWidth="1.5"
      />
      <path d="M4 19h16" strokeWidth="1.5" />
    </svg>
  );
}

export function IconLuggage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="6" y="8" width="12" height="12" rx="2" strokeWidth="1.5" />
      <path d="M9 8V6c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2" strokeWidth="1.5" />
    </svg>
  );
}

export function IconFuel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 4h8v16H6z" strokeWidth="1.5" />
      <path d="M14 7h2.5l1.5 2v7c0 1.1-.9 2-2 2h-2" strokeWidth="1.5" />
      <path d="M8 7h4" strokeWidth="1.5" />
    </svg>
  );
}

export function IconGear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      <path
        d="M19.4 15a7.7 7.7 0 000-6l2-1.2-2-3.5-2.3 1a7.7 7.7 0 00-5.1-2.1l-.6-2.5h-4l-.6 2.5a7.7 7.7 0 00-5.1 2.1l-2.3-1-2 3.5 2 1.2a7.7 7.7 0 000 6l-2 1.2 2 3.5 2.3-1a7.7 7.7 0 005.1 2.1l.6 2.5h4l.6-2.5a7.7 7.7 0 005.1-2.1l2.3 1 2-3.5-2-1.2z"
        strokeWidth="1.3"
      />
    </svg>
  );
}
