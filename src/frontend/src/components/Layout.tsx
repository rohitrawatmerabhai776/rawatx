import BottomNav from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  fullscreen?: boolean;
}

/**
 * Main app layout — mobile-first, full-screen, dark, no top header.
 * Uses fixed bottom navigation for primary navigation.
 * `fullscreen` mode gives children the full viewport (for reel feed).
 */
export default function Layout({
  children,
  showNav = true,
  fullscreen = false,
}: LayoutProps) {
  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden max-w-lg mx-auto">
      <main
        className={
          fullscreen
            ? "flex-1 overflow-hidden"
            : "flex-1 overflow-y-auto content-with-nav"
        }
      >
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
