import Logo from "@/components/logo";

type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
  align?: "left" | "center";
  subtitle?: string;
};

export default function BrandMark({
  light = false,
  compact = false,
  align = "left",
  subtitle,
}: BrandMarkProps) {
  const isCenter = align === "center";
  const textColor = light ? "text-white" : "text-[var(--brand-brown)]";
  const mutedColor = light
    ? "text-white/72"
    : "text-[color:rgba(37,26,6,0.72)]";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <Logo
          size={compact ? "sm" : "md"}
          light={light}
          shape="toast"
        />
        <div>
          <p
            className={`font-black uppercase tracking-[0.2em] ${textColor} ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            Ol&apos; Colony
          </p>
          <p
            className={`uppercase tracking-[0.32em] ${mutedColor} ${
              compact ? "text-[10px]" : "text-xs"
            }`}
          >
            Golf Course
          </p>
        </div>
      </div>
      <p
        className={`mt-2 uppercase tracking-[0.34em] ${
          compact ? "text-[10px]" : "text-xs"
        } ${mutedColor}`}
      >
        A PARA Property
      </p>
      {subtitle ? (
        <p
          className={`mt-3 ${
            compact ? "text-xs" : "text-sm"
          } ${mutedColor}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
