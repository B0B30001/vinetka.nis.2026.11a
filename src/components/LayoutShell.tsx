import Link from "next/link";

interface LayoutShellProps {
  schoolName: string;
  className: string;
  basePath: string;
  children: React.ReactNode;
}

export default function LayoutShell({
  schoolName,
  className,
  basePath,
  children,
}: LayoutShellProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link
            href={basePath}
            className="text-sm font-semibold tracking-tight hover:opacity-70 transition"
          >
            {schoolName}
            <span className="hidden sm:inline text-[var(--color-muted)] font-normal">
              {" "}
              / {className}
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href={basePath}
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition"
            >
              Home
            </Link>
            <Link
              href={`${basePath}/tour`}
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition"
            >
              Tour
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
          <span>
            © {new Date().getFullYear()} {schoolName}
          </span>
          <span>
            Powered by{" "}
            <span className="font-medium text-[var(--color-fg)]">Vinetla</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
