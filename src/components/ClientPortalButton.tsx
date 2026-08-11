export default function ClientPortalButton() {
  return (
    <a
      href="https://norte-studio-clientes.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      style={{ mixBlendMode: "difference" }}
      className="fixed top-ns-2 left-ns-2 z-40 border border-ns-white bg-ns-white px-ns-2 py-ns-1 text-micro tracking-[0.08em] uppercase text-ns-black sm:px-ns-3"
    >
      <span className="sm:hidden">Panel</span>
      <span className="hidden sm:inline">Panel de cliente</span>
    </a>
  );
}
