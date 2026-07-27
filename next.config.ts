import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
];

const globalCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-src https://*.canva.com https://www.canva.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const joinCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.office.com https://*.microsoft.com https://*.microsoftonline.com",
  "style-src 'self' 'unsafe-inline' https://*.office.com https://*.microsoft.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.office.com https://*.microsoft.com https://*.microsoftonline.com https://*.office.net https://vitals.vercel-insights.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-src https://*.office.com https://*.microsoft.com https://*.microsoftonline.com https://*.office.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://*.office.com https://*.microsoft.com",
].join('; ');

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Everything except /join and its subpaths. The negative lookahead is
        // anchored to a full path segment ((?!join(?:/|$))) rather than a bare
        // prefix, so routes like /joins or /join-us still match this global rule
        // instead of silently getting zero CSP header.
        source: '/((?!join(?:/|$)).*)',
        headers: [...securityHeaders, { key: 'Content-Security-Policy', value: globalCsp }],
      },
      {
        source: '/join/:path*',
        headers: [...securityHeaders, { key: 'Content-Security-Policy', value: joinCsp }],
      },
    ];
  },
};

export default nextConfig;
