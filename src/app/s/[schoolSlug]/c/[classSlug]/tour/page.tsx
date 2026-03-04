import { notFound } from "next/navigation";
import { getClassConfig } from "@/data/schools";
import LayoutShell from "@/components/LayoutShell";
import TourClient from "@/components/TourClient";

interface PageProps {
  params: Promise<{ schoolSlug: string; classSlug: string }>;
}

export default async function TourPage({ params }: PageProps) {
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
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Virtual Tour
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Click on any pin to open a 360° panorama. Drag to look around.
          </p>
        </div>

        {/* Map + Panorama modal */}
        <div className="animate-fade-in" style={{ animationDelay: "80ms" }}>
          <TourClient mapImage={config.mapImage} scenes={config.scenes} />
        </div>

        {/* Scene list (mobile-friendly alternative) */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "160ms" }}>
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
            All locations
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {config.scenes.map((scene) => (
              <div
                key={scene.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)]
                           bg-white p-3 text-sm shadow-[var(--shadow-sm)]"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                             bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145c.182-.1.422-.244.703-.432a19.856 19.856 0 002.748-2.217C15.862 14.407 18 11.625 18 8a8 8 0 00-16 0c0 3.625 2.138 6.407 3.934 8.128a19.856 19.856 0 003.028 2.504c.282.188.521.332.703.432a5.741 5.741 0 00.3.153l.018.008.006.003zM10 11a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-medium">{scene.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
