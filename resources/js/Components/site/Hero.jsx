import heroImage from "@/assets/hero-sports.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden text-white"
    >
      <img
        src={heroImage}
        alt="Athletes training on a multi-sport field"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            PFA Project · 2026
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Multi-Sport Academy{" "}
            <span className="text-accent">Management Platform</span>
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            A modern solution to manage coaches, students, sports, and training sessions efficiently.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary-dark"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-card">
          <h3 className="text-xl font-bold text-white">Why choose this platform?</h3>
          <p className="mt-2 text-sm text-white/70">
            Everything your academy needs in one elegant dashboard.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "Manage students and memberships",
              "Manage coaches and staff",
              "Plan training sessions",
              "Multi-sport support out of the box",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
