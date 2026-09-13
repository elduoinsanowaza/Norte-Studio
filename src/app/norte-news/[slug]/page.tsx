import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { norteNewsMdxComponents } from "@/components/norteNews/mdxComponents";
import { getAllNorteNewsEntries, getNorteNewsEntry, formatNorteNewsDate } from "@/lib/norteNews";

export function generateStaticParams() {
  return getAllNorteNewsEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNorteNewsEntry(slug);
  if (!entry) return {};

  return {
    title: `${entry.title} — Norte News`,
    description: entry.excerpt,
  };
}

export default async function NorteNewsEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getNorteNewsEntry(slug);
  if (!entry) notFound();

  return (
    <main className="min-h-screen bg-ns-white text-ns-black">
      <div className="container-content flex flex-col py-ns-7">
        {/* Masthead */}
        <div className="flex flex-col items-center gap-ns-2 pb-ns-4 text-center">
          <Link
            href="/"
            className="text-micro tracking-[0.08em] uppercase opacity-50 transition-opacity duration-200 hover:opacity-80"
          >
            Norte Studio
          </Link>
          <Link href="/norte-news" className="font-serif text-4xl tracking-tight sm:text-5xl">
            Norte News
          </Link>
        </div>
        <div className="h-[3px] bg-ns-black" />
        <div className="mt-1 h-px bg-ns-black" />

        <article className="mx-auto flex w-full max-w-3xl flex-col gap-ns-5 py-ns-7">
          <Link
            href="/norte-news"
            className="self-start text-micro tracking-[0.08em] uppercase opacity-50 transition-opacity duration-200 hover:opacity-80"
          >
            ← Todas las entradas
          </Link>

          <div className="flex flex-col gap-3 border-b border-ns-black pb-ns-5">
            <h1 className="font-serif text-4xl leading-[1.1] sm:text-5xl">{entry.title}</h1>
            <span className="text-micro tracking-[0.06em] uppercase opacity-50">
              Norte Studio · {formatNorteNewsDate(entry.date)}
            </span>
          </div>

          <div className="flex max-w-[var(--text-width)] flex-col gap-ns-4">
            <MDXRemote source={entry.content} components={norteNewsMdxComponents} />
          </div>

          <p className="border-t border-ns-black/20 pt-ns-4 text-micro tracking-[0.02em] opacity-50">
            Fuente — {entry.source}
          </p>
        </article>
      </div>
    </main>
  );
}
