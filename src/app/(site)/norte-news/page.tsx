import type { Metadata } from "next";
import Link from "next/link";
import { getAllNorteNewsEntries, formatNorteNewsDate } from "@/lib/norteNews";

export const metadata: Metadata = {
  title: "Norte News — Norte Studio",
  description: "Hallazgos, tips y datos nacidos de estudios e investigaciones.",
};

const TODAY_LABEL = new Date().toLocaleDateString("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function NorteNewsIndexPage() {
  const [lead, ...rest] = getAllNorteNewsEntries();

  return (
    <main className="min-h-screen bg-ns-white text-ns-black">
      <div className="container-content flex flex-col py-ns-7">
        {/* Masthead */}
        <div className="flex flex-col items-center gap-ns-2 pb-ns-4 text-center">
          <Link href="/" className="text-micro tracking-[0.08em] uppercase opacity-50 transition-opacity duration-200 hover:opacity-80">
            Norte Studio
          </Link>
          <h1 className="font-serif text-6xl tracking-tight sm:text-7xl">Norte News</h1>
          <p className="text-micro tracking-[0.04em] uppercase opacity-50">{TODAY_LABEL}</p>
        </div>
        <div className="h-[3px] bg-ns-black" />
        <div className="mt-1 h-px bg-ns-black" />

        <p className="max-w-[var(--text-width)] py-ns-5 text-body opacity-70">
          Hallazgos, tips y datos nacidos de estudios e investigaciones — contenido que aporta
          valor, agendes una sesión o no.
        </p>

        {!lead ? (
          <p className="border-t border-ns-black/10 py-ns-6 text-body opacity-60">
            Aún no hay entradas publicadas.
          </p>
        ) : (
          <div className="flex flex-col">
            {/* Lead story — the most recent entry, given the front-page treatment */}
            <Link
              href={`/norte-news/${lead.slug}`}
              className="flex flex-col gap-ns-2 border-t-2 border-ns-black py-ns-6 transition-opacity duration-200 hover:opacity-70"
            >
              <span className="text-micro tracking-[0.08em] uppercase opacity-50">
                {formatNorteNewsDate(lead.date)}
              </span>
              <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                {lead.title}
              </h2>
              <p className="max-w-[var(--text-width)] pt-1 text-body opacity-70">
                {lead.excerpt}
              </p>
            </Link>

            {rest.length > 0 && (
              <div className="flex flex-col border-t border-ns-black/20">
                {rest.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/norte-news/${entry.slug}`}
                    className="flex flex-col gap-1 border-b border-ns-black/20 py-ns-5 transition-opacity duration-200 hover:opacity-70"
                  >
                    <span className="text-micro tracking-[0.06em] uppercase opacity-50">
                      {formatNorteNewsDate(entry.date)}
                    </span>
                    <h3 className="max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">
                      {entry.title}
                    </h3>
                    <p className="max-w-[var(--text-width)] text-body opacity-70">
                      {entry.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
