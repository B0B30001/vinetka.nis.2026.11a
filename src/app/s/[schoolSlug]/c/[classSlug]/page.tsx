import { notFound } from "next/navigation";
import Link from "next/link";
import { getClassConfig } from "@/data/schools";
import LayoutShell from "@/components/LayoutShell";

interface PageProps {
  params: Promise<{ schoolSlug: string; classSlug: string }>;
}

export default async function ClassLandingPage({ params }: PageProps) {
  const { schoolSlug, classSlug } = await params;
  const config = getClassConfig(schoolSlug, classSlug);

  if (!config) notFound();

  const basePath = `/s/${schoolSlug}/c/${classSlug}`;

  return (
    <LayoutShell
      schoolName={config.schoolName}
      className={config.className}
      basePath={basePath}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient backdrop */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${config.accent ?? "var(--color-accent)"} 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <div className="animate-fade-in">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
              {config.schoolName}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {config.className}
            </h1>
            <p className="mt-4 text-lg text-[var(--color-muted)] max-w-md mx-auto">
              Explore our school through immersive 360° panoramas and cherish
              the memories that made us who we are.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 stagger">
            <Link
              href={`${basePath}/tour`}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-fg)] text-white
                         px-6 py-3 text-sm font-medium shadow-[var(--shadow-md)]
                         transition hover:opacity-90 active:scale-[0.98] animate-fade-in"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145c.182-.1.422-.244.703-.432a19.856 19.856 0 002.748-2.217C15.862 14.407 18 11.625 18 8a8 8 0 00-16 0c0 3.625 2.138 6.407 3.934 8.128a19.856 19.856 0 003.028 2.504c.282.188.521.332.703.432a5.741 5.741 0 00.3.153l.018.008.006.003zM10 11a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Virtual Tour
            </Link>

            <span
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)]
                         bg-white px-6 py-3 text-sm font-medium text-[var(--color-muted)]
                         shadow-[var(--shadow-sm)] cursor-default animate-fade-in"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM7.5 6a1.25 1.25 0 100 2.5h.095a1.97 1.97 0 001.788-1.146l.363-.79A2.75 2.75 0 0112.25 5h.382a2.25 2.25 0 012.236 2.007l.058.46A4.5 4.5 0 0119 11.957V16.5a1.5 1.5 0 01-1.5 1.5h-2.768a3 3 0 01-2.496-1.336l-.86-1.29a3 3 0 00-2.496-1.336H7.5a1.25 1.25 0 110-2.5h1a2.5 2.5 0 002.236-1.382l.141-.281A2.97 2.97 0 007.595 8.5H7.5A1.25 1.25 0 016.25 7.25v-.5c0-.414.336-.75.75-.75h.5z" />
              </svg>
              Memories
              <span className="text-[10px] bg-[var(--color-border)] rounded-full px-2 py-0.5 font-medium">
                Soon
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-3 stagger">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" />
                </svg>
              ),
              title: "Interactive Map",
              desc: "Navigate through the school with our detailed floor plan and clickable hotspots.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.2.32.544.524.921.56a49.052 49.052 0 013.16.566c1.07.224 1.86 1.12 1.86 2.206v10.14a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 014.25 19.25V9.11c0-1.085.79-1.982 1.86-2.206a49.052 49.052 0 013.16-.566c.377-.036.72-.24.921-.56l.821-1.317a2.338 2.338 0 012.332-1.39zM12 17.25a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" clipRule="evenodd" />
                </svg>
              ),
              title: "360° Panoramas",
              desc: "Step into any room with immersive panoramic views you can explore freely.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>
              ),
              title: "Class Memories",
              desc: "Coming soon — a digital yearbook to relive the best moments together.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[var(--color-border)] bg-white p-6
                         shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow
                         animate-fade-in"
            >
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg
                            bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
              >
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </LayoutShell>
  );
}
