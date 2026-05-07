const features = [
  {
    icon: "👨‍🎓",
    title: "Student Management",
    desc: "Track members, attendance and progress with intuitive profiles.",
  },
  {
    icon: "🧑‍🏫",
    title: "Coach Management",
    desc: "Assign coaches to teams, manage availability and certifications.",
  },
  {
    icon: "📅",
    title: "Session Scheduling",
    desc: "Plan weekly sessions with conflict detection and reminders.",
  },
  {
    icon: "🏟️",
    title: "Multi-Sport System",
    desc: "Football, basketball, volleyball, handball — all in one place.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Capabilities
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to run a thriving multi-sport academy.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-colors group-hover:bg-accent">
                {f.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
