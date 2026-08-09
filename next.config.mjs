/** @type {import('next').NextConfig} */

// Sitewide security headers. Applied to every route via headers() below.
// - X-Frame-Options / frame-ancestors: block clickjacking (no embedding).
// - X-Content-Type-Options: stop MIME-sniffing.
// - Referrer-Policy: don't leak full URLs to cross-origin destinations.
// - Strict-Transport-Security: force HTTPS (only honored over HTTPS; harmless
//   on localhost). 2-year max-age with preload is the recommended baseline.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Canonical host: permanently send the apex (non-www) host to www so the
      // two hostnames never compete for indexing, regardless of DNS/hosting
      // config. 308 (permanent) with an absolute destination for the host swap.
      {
        source: "/:path*",
        has: [{ type: "host", value: "codeitdevs.com" }],
        destination: "https://www.codeitdevs.com/:path*",
        permanent: true,
      },
      // The public catalog was consolidated onto /portfolio (backed by real
      // database Products). The old /products routes 308-redirect there so any
      // indexed links keep their SEO equity and never 404.
      { source: "/products", destination: "/portfolio", permanent: true },
      {
        source: "/products/:slug",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    // Allow next/image to optimize product media in Phase 2. Cloudinary is
    // the planned upload host; the YouTube domains cover video thumbnails.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
