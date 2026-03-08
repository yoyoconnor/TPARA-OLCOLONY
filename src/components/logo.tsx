type LogoProps = {
  /** sm: 32px, md: 40px, lg: 48px */
  size?: "sm" | "md" | "lg";
  /** Light version for dark backgrounds (e.g. hero, footer) */
  light?: boolean;
  /** square = no rounding, toast = rounded-xl */
  shape?: "square" | "toast";
  className?: string;
};

const sizeMap = { sm: 32, md: 40, lg: 48 };

export default function Logo({
  size = "md",
  light = false,
  shape = "toast",
  className = "",
}: LogoProps) {
  const px = sizeMap[size];
  const rounded = shape === "toast" ? "rounded-xl" : "rounded-none";
  const bg = light
    ? "bg-white/15 border border-white/20"
    : "bg-[var(--brand-brown)] border border-[var(--brand-brown)]";
  const fill = light ? "#ffffff" : "#ffffff";

  return (
    <div
      className={`flex shrink-0 items-center justify-center border ${rounded} ${bg} ${className}`}
      style={{ width: px, height: px }}
      aria-hidden
    >
      <span
        className="font-black tracking-[0.2em] uppercase"
        style={{
          fontSize: Math.round(px * 0.4),
          color: fill,
        }}
      >
        OC
      </span>
    </div>
  );
}
