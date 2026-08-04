type ValrMarkProps = {
  className?: string;
  compact?: boolean;
};

export function ValrMark({ className = "", compact = false }: ValrMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-label="VÄLR">
      <svg viewBox="0 0 42 42" role="img" aria-hidden="true">
        <path d="M5 5 21 37 37 5 29 9 21 27 13 9Z" />
        <path d="m14 17 7-12 7 12-7 17Z" />
      </svg>
      {!compact && <span>VÄLR</span>}
    </span>
  );
}
