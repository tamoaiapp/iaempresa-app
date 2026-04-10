import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIAS_DIR = path.join(process.cwd(), "content", "guias");

export interface GuiaFrontmatter {
  title: string;
  description: string;
  categoria: string;
  tempo: string;
  dificuldade: "iniciante" | "intermediário";
  custo?: string;
  cta?: "tamowork" | "buscafornecedor" | "fidelizaai";
  destaque?: boolean;
}

export interface Guia extends GuiaFrontmatter {
  slug: string;
  content: string;
}

export function getAllGuias(): Guia[] {
  if (!fs.existsSync(GUIAS_DIR)) return [];
  const files = fs.readdirSync(GUIAS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(GUIAS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return { slug, content, ...(data as GuiaFrontmatter) };
    })
    .sort((a, b) => (a.destaque ? -1 : 1) - (b.destaque ? -1 : 1));
}

export function getGuiaBySlug(slug: string): Guia | null {
  const filepath = path.join(GUIAS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as GuiaFrontmatter) };
}

export function getGuiasByCategoria(categoria: string): Guia[] {
  return getAllGuias().filter((g) => g.categoria === categoria);
}
