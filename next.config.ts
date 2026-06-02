import type { NextConfig } from "next";

/**
 * Video Commerce mora no projeto `agent-zap` (compartilha motor live_video).
 * iaempresa.app/videocomerce/* → proxy pro deploy do agent-zap.
 * Webhook do Stripe Commerce também passa por aqui pra a URL ficar limpa.
 */
const AGENT_ZAP_TARGET = "https://agent-zap-tiagomo-6026s-projects.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/videocomerce",
        destination: `${AGENT_ZAP_TARGET}/videocomerce`,
      },
      {
        source: "/videocomerce/:path*",
        destination: `${AGENT_ZAP_TARGET}/videocomerce/:path*`,
      },
      {
        source: "/api/webhooks/stripe-commerce",
        destination: `${AGENT_ZAP_TARGET}/api/webhooks/stripe-commerce`,
      },
    ];
  },
};

export default nextConfig;
