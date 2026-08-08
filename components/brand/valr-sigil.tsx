type ValrSigilProps = {
  className?: string;
  title?: string;
};

export function ValrSigil({ className = "", title }: ValrSigilProps) {
  const labelled = Boolean(title);

  return (
    <svg
      className={`valr-sigil ${className}`}
      viewBox="0 0 32 44"
      fill="none"
      role={labelled ? "img" : undefined}
      aria-label={title}
      aria-hidden={labelled ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M16 2 28 18 16 34 4 18 16 2Z" />
      <path d="M16 10 26 24 16 42 6 24 16 10Z" />
      <path d="M7.5 8.5 24.5 35.5" />
      <path d="M24.5 8.5 7.5 35.5" />
    </svg>
  );
}
