export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
            ⚽
          </span>
          MultiSport Academy
        </div>

        <p className="text-sm text-white/70">
          © 2026 MultiSport Academy – PFA Project
        </p>

        <div className="flex items-center gap-3">
          {["Facebook", "Instagram", "Twitter"].map((s) => (
            <a
              key={s}
              href="#"
              aria-label={s}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              {s[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
