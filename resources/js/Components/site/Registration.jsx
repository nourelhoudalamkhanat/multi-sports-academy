import { useState, type FormEvent } from "react";

const sports = ["Football", "Basketball", "Volleyball", "Handball"];

export function Registration() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="register" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Join us
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Register Now
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fill in the form and our team will reach out within 24h.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" type="text" placeholder="John Doe" required />
            <Field label="Email" name="email" type="email" placeholder="john@example.com" required />
            <Field label="Age" name="age" type="number" placeholder="18" required min={5} max={80} />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Sport</label>
              <select
                name="sport"
                required
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select a sport…</option>
                {sports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your goals…"
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Submit Registration
          </button>

          {sent && (
            <p className="mt-4 text-sm font-medium text-primary">
              ✓ Thank you! Your registration has been received.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        {...rest}
        className="h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
