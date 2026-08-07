import Logo from "@/components/Logo";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ns-black py-ns-7 text-ns-white">
      <div className="container-content flex flex-col items-center gap-ns-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <Logo className="invert" />

        <div className="flex flex-col items-center gap-ns-2 text-micro tracking-[0.04em] opacity-70 sm:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-opacity duration-200 hover:opacity-100"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-100"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <span className="pt-ns-1 opacity-60">Norte Studio</span>
        </div>
      </div>
    </footer>
  );
}
