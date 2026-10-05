type PlaceholderMediaProps = {
  label: string;
  aspect?: "portrait" | "landscape" | "square";
  className?: string;
};

const aspectClasses = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/9]",
  square: "aspect-square",
};

/**
 * Temporary stand-in for photography that has not been supplied yet.
 * Clearly labelled so it can never be mistaken for finished content.
 */
export function PlaceholderMedia({
  label,
  aspect = "landscape",
  className = "",
}: PlaceholderMediaProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-line bg-[color-mix(in_srgb,var(--paper)_60%,white)] p-6 text-center ${aspectClasses[aspect]} ${className}`}
      role="img"
      aria-label={`${label} — placeholder, photo pending`}
    >
      <span className="meta text-muted">{label}</span>
    </div>
  );
}
