/** A restrained engraved press-mark: the Notabene "NN" within a double
 *  rule, in antique gilt — evokes a Golden-Age title-page device without
 *  ornament for ornament's sake. */
export function PressMark({ size = 52 }: { size?: number }) {
  return (
    <svg
      className="header-mark"
      width={size}
      height={size}
      viewBox="0 0 60 60"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="55" height="55" rx="2" fill="none"
        stroke="#A9893F" strokeWidth="1.4" />
      <rect x="6" y="6" width="48" height="48" rx="1" fill="none"
        stroke="#A9893F" strokeWidth="0.5" opacity="0.7" />
      <text x="30" y="39" textAnchor="middle"
        fontFamily="var(--font-display), serif" fontSize="26"
        fontWeight="700" letterSpacing="-1" fill="#E9D9AE">
        NN
      </text>
    </svg>
  );
}

export function Fleuron() {
  return (
    <div
      aria-hidden
      style={{
        textAlign: "center",
        color: "#A9893F",
        opacity: 0.55,
        letterSpacing: "0.6em",
        margin: "2rem 0",
        fontSize: 15,
      }}
    >
      ❧ ❧ ❧
    </div>
  );
}
