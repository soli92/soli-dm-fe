import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const apiPublicBases = Array.from(
  new Set(
    [
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
        /\/$/,
        ""
      ),
      // Fallback se il build su Vercel non ha NEXT_PUBLIC_API_URL o lo SW è vecchio
      "https://soli-dm-be.onrender.com",
    ].filter(Boolean)
  )
);

/** Match callback inlined into sw.js — literals via `new Function` + JSON (no closure vars in SW). */
const crossOriginExceptApiMatcher = new Function(
  "opts",
  `
  var sameOrigin = opts.sameOrigin, url = opts.url;
  if (sameOrigin) return false;
  var prefixes = ${JSON.stringify(apiPublicBases)};
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] && url.href.startsWith(prefixes[i])) return false;
  }
  return true;
`
) as (opts: { sameOrigin: boolean; url: URL }) => boolean;

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  // default dynamicStartUrl injects async cacheWillUpdate into sw.js; Next/SWC can
  // emit _async_to_generator without defining it in the SW scope → ReferenceError at runtime.
  // false = precache start URL with revision (fine when "/" is not auth-dependent HTML).
  dynamicStartUrl: false,
  // Merge with default Workbox routes; override same cacheName as default "cross-origin" entry.
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        // Default plugin uses !sameOrigin + NetworkFirst → no-response on failed fetch (CORS/offline).
        // Exclude REST API host so the page fetch bypasses this SW route (no Workbox no-response noise).
        urlPattern: crossOriginExceptApiMatcher,
        handler: "NetworkFirst",
        method: "GET",
        options: {
          cacheName: "cross-origin",
          expiration: { maxEntries: 32, maxAgeSeconds: 3600 },
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },
};

export default withPWA(nextConfig);
