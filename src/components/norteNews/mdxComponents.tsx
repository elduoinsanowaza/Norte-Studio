import type { ComponentPropsWithoutRef } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/** Same visual language as the rest of the site — no prose plugin, just direct mappings. */
export const norteNewsMdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-body leading-relaxed" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-2xl font-medium" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-xl font-medium" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="flex list-disc flex-col gap-1 pl-ns-4 text-body leading-relaxed" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="flex list-decimal flex-col gap-1 pl-ns-4 text-body leading-relaxed" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="underline transition-opacity duration-200 hover:opacity-70" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-2 border-ns-black/20 pl-ns-3 italic opacity-80" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <table className="w-full border-collapse text-micro" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-ns-black/20 py-ns-1 text-left font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-ns-black/10 py-ns-1" {...props} />
  ),
};
