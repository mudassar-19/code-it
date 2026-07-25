// Decorative transition between two full-bleed sections. Renders as a thin
// strip in the *previous* section's color with an SVG shape in the *next*
// section's color cut into its bottom edge — an angled or curved seam
// instead of a flat rectangular section boundary. Purely decorative (no
// text, no interaction), so it's marked aria-hidden and costs nothing for
// screen readers or reduced-motion users.

type ShapeDividerProps = {
  variant?: "wave" | "angle";
  bgColor: string;
  fillColor: string;
  flip?: boolean;
  height?: string;
};

const PATHS: Record<"wave" | "angle", string> = {
  wave: "M0,32 C280,92 400,-8 720,42 C1040,92 1160,-8 1440,32 L1440,100 L0,100 Z",
  angle: "M0,100 L1440,0 L1440,100 Z",
};

export default function ShapeDivider({
  variant = "wave",
  bgColor,
  fillColor,
  flip = false,
  height = "h-12 sm:h-20 lg:h-28",
}: ShapeDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden ${height}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className={`absolute inset-0 h-full w-full ${flip ? "-scale-x-100" : ""}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill={fillColor}
      >
        <path d={PATHS[variant]} />
      </svg>
    </div>
  );
}
