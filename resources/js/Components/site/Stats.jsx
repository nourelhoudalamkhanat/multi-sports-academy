import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1200, label: "Members", suffix: "+" },
  { value: 45, label: "Coaches", suffix: "" },
  { value: 8, label: "Sports", suffix: "" },
  { value: 120, label: "Weekly Sessions", suffix: "" },
];

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function StatItem({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCountUp(value, active);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-accent sm:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/80">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-gradient-stats py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 md:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
