import football from "@/assets/sport-football.jpg";
import basketball from "@/assets/sport-basketball.jpg";
import volleyball from "@/assets/sport-volleyball.jpg";
import handball from "@/assets/sport-handball.avif";

const sports = [
  { img: football, title: "Football", desc: "Train with certified coaches on real grass fields." },
  { img: basketball, title: "Basketball", desc: "Indoor courts and structured weekly programs." },
  { img: volleyball, title: "Volleyball", desc: "Beach and indoor sessions for every level." },
  { img: handball, title: "Handball", desc: "Team play, agility and conditioning drills." },
];

export function Sports() {
  return (
    <section id="sports" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Disciplines
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sports We Offer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick your discipline — or train across several.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sports.map((s) => (
            <div
              key={s.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
