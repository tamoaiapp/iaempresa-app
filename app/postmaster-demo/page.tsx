import type { Metadata } from "next";
import PostmasterDemoClient from "./client";

export const metadata: Metadata = {
  title: "PostMaster — Demo privada",
  description: "Acesso de demonstração ao PostMaster (privado, por convite).",
  robots: { index: false, follow: false, nocache: true },
};

export default function PostmasterDemoPage() {
  return <PostmasterDemoClient />;
}
