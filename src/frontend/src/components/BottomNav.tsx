import { cn } from "@/lib/utils";
import type { NavTab } from "@/types";
import { Link, useRouterState } from "@tanstack/react-router";
import { Coins, Home, PlusSquare, Search, User } from "lucide-react";

interface NavItem {
  tab: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { tab: "home", label: "Home", icon: Home, href: "/" },
  { tab: "search", label: "Search", icon: Search, href: "/search" },
  { tab: "create", label: "Create", icon: PlusSquare, href: "/create" },
  { tab: "earn", label: "Earn", icon: Coins, href: "/earn" },
  { tab: "profile", label: "Profile", icon: User, href: "/profile/me" },
];

export default function BottomNav() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const getActiveTab = (): NavTab => {
    if (pathname === "/" || pathname === "") return "home";
    if (pathname.startsWith("/search")) return "search";
    if (pathname.startsWith("/create")) return "create";
    if (pathname.startsWith("/earn") || pathname.startsWith("/wallet"))
      return "earn";
    if (pathname.startsWith("/profile")) return "profile";
    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border bottom-nav-safe"
      aria-label="Main navigation"
      data-ocid="bottom_nav"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          const isCreate = item.tab === "create";

          return (
            <Link
              key={item.tab}
              to={item.href}
              data-ocid={`nav.${item.tab}_tab`}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 relative transition-smooth",
                isCreate ? "scale-110" : "",
                isActive && !isCreate
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isCreate ? (
                <div className="btn-accent p-3 rounded-xl glow-accent shadow-lg">
                  <item.icon className="w-5 h-5" />
                </div>
              ) : (
                <>
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-smooth",
                      isActive ? "text-accent" : "",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium leading-none",
                      isActive ? "text-accent" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full tab-active-indicator" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
