const rows = [
  { day: "Monday", sport: "Football", time: "17:00 – 19:00", coach: "Karim Bensalah" },
  { day: "Tuesday", sport: "Basketball", time: "18:00 – 20:00", coach: "Sara El Idrissi" },
  { day: "Wednesday", sport: "Volleyball", time: "16:30 – 18:30", coach: "Youssef Amrani" },
  { day: "Thursday", sport: "Handball", time: "17:30 – 19:30", coach: "Nadia Ouali" },
  { day: "Friday", sport: "Football", time: "18:00 – 20:00", coach: "Karim Bensalah" },
  { day: "Saturday", sport: "Multi-sport", time: "10:00 – 13:00", coach: "Staff" },
];

export function Schedule() {
  return (
    <section id="schedule" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Planning
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Weekly Schedule
          </h2>
          <p className="mt-4 text-muted-foreground">
            A clear overview of training sessions across the week.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="hidden grid-cols-4 gap-4 bg-primary-dark px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white md:grid">
            <div>Day</div>
            <div>Sport</div>
            <div>Time</div>
            <div>Coach</div>
          </div>
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li
                key={r.day + r.sport}
                className="grid grid-cols-1 gap-2 px-6 py-4 transition-colors hover:bg-secondary md:grid-cols-4 md:items-center md:gap-4"
              >
                <div className="font-semibold text-foreground">{r.day}</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-primary-dark">
                    {r.sport}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{r.time}</div>
                <div className="text-sm text-foreground">{r.coach}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
