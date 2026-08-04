export function RuneSigil() {
  return (
    <div className="sigil-wrap">
      <div className="sigil-ring ring-outer" />
      <div className="sigil-ring ring-middle" />
      <div className="sigil-ring ring-inner" />
      <svg className="sigil-runes" viewBox="0 0 500 500">
        <defs>
          <path id="runePath" d="M250,250 m-210,0 a210,210 0 1,1 420,0 a210,210 0 1,1 -420,0" />
        </defs>
        <text>
          <textPath href="#runePath" startOffset="2%">
            ᚠ · ᚢ · ᚦ · ᚨ · ᚱ · ᚲ · ᚷ · ᚹ · ᚺ · ᚾ · ᛁ · ᛃ · ᛇ · ᛈ · ᛉ · ᛊ · ᛏ · ᛒ · ᛖ · ᛗ · ᛚ · ᛜ · ᛞ · ᛟ ·
          </textPath>
        </text>
      </svg>
      <svg className="sigil-core" viewBox="0 0 180 260">
        <path d="M22 24 90 232 158 24 126 46 90 154 54 46Z" />
        <path d="m58 94 32-70 32 70-32 116Z" />
        <path className="core-cut" d="m90 24 1 185" />
      </svg>
      <span className="sigil-glow" />
    </div>
  );
}
