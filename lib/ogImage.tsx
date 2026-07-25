// ---------------------------------------------------------------------------
// Shared renderer behind every app/**/opengraph-image.tsx route. Next.js's
// file-convention OG images are plain Route Handlers under the hood, so
// this can't be a React component — it returns an ImageResponse directly.
// Colors are hardcoded hex (not the CSS-variable tokens the rest of the
// site uses) because these render to a static PNG at build time, outside
// any browser/theme context — see lib/theme.ts's `colors` for why that
// file does the same for Three.js.
// ---------------------------------------------------------------------------

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

let cachedLogoDataUri: string | null = null;

// Read once per build/server lifetime, not once per page — every industry
// and portfolio project OG image reuses the same logo bytes.
function getLogoDataUri(): string {
  if (cachedLogoDataUri) return cachedLogoDataUri;
  const filePath = join(process.cwd(), "public/images/codeit-web-logo-dark.png");
  const base64 = readFileSync(filePath).toString("base64");
  cachedLogoDataUri = `data:image/png;base64,${base64}`;
  return cachedLogoDataUri;
}

const siteHost = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return "codeit.com";
  }
})();

export function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const logo = getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#050816",
          backgroundImage:
            "radial-gradient(circle at 85% 12%, rgba(34,211,255,0.28), rgba(5,8,22,0) 55%), radial-gradient(circle at 8% 105%, rgba(31,111,255,0.28), rgba(5,8,22,0) 50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og requires a raw <img>, not next/image */}
        <img src={logo} width={280} height={95} alt="" />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                color: "#CBD5E1",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 220,
              height: 6,
              borderRadius: 999,
              backgroundImage:
                "linear-gradient(135deg, #22D3FF 0%, #1F6FFF 55%, #1A4DFF 100%)",
            }}
          />
          <div style={{ display: "flex", fontSize: 22, color: "#94A3B8" }}>
            {siteHost}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
