import { ValrSigil } from "@/components/brand/valr-sigil";

type ValrMarkProps = {
  className?: string;
  compact?: boolean;
};

export function ValrMark({ className = "", compact = false }: ValrMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-label="VÄLR">
      <ValrSigil />
      {!compact && <span>VÄLR</span>}
    </span>
  );
}
