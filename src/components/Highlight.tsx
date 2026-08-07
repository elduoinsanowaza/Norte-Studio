import { Fragment } from "react";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Wraps every occurrence of the given words/phrases in `text` with a
 * `.highlight` span. Matching is a plain literal split (no \b word-boundary
 * regex) because JS's \b only treats ASCII letters as word characters,
 * which breaks on accented Spanish text — safe here since callers only
 * pass words that don't occur as substrings of other words in that string.
 */
export default function Highlight({
  text,
  words,
}: {
  text: string;
  words: string[];
}) {
  if (words.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        words.includes(part) ? (
          <span key={i} className="highlight">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
