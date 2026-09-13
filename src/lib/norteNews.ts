import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "norte-news");

export type NorteNewsFrontmatter = {
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Reference to the study/data source the entry cites. */
  source: string;
};

export type NorteNewsEntry = NorteNewsFrontmatter & {
  slug: string;
  content: string;
  /** First non-empty line of the body, used as the index-page summary. */
  excerpt: string;
};

function readEntryFile(fileName: string): NorteNewsEntry {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as NorteNewsFrontmatter;
  const excerpt =
    content
      .trim()
      .split("\n")
      .find((line) => line.trim().length > 0) ?? "";

  return { ...frontmatter, slug, content: content.trim(), excerpt };
}

/** All entries, most recent first. */
export function getAllNorteNewsEntries(): NorteNewsEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readEntryFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNorteNewsEntry(slug: string): NorteNewsEntry | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readEntryFile(`${slug}.mdx`);
}

export function formatNorteNewsDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
