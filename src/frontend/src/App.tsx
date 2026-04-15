import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ─── Lazy page imports ────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const HomeFeedPage = lazy(() => import("@/pages/HomeFeedPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const CreatePage = lazy(() => import("@/pages/CreatePage"));
const EarnPage = lazy(() => import("@/pages/EarnPage"));
const WalletPage = lazy(() => import("@/pages/WalletPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

// ─── Page loading fallback ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <LoadingSpinner size="md" />
    </div>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────
function RootLayout() {
  return <Outlet />;
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-background px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
        🎬
      </div>
      <h1 className="text-2xl font-bold font-display text-foreground">
        Page Not Found
      </h1>
      <p className="text-muted-foreground text-sm">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm"
      >
        Go Home
      </a>
    </div>
  );
}

// ─── Route tree ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

function ProtectedLayout({ fullscreen = false }: { fullscreen?: boolean }) {
  return (
    <ProtectedRoute>
      <Layout showNav fullscreen={fullscreen}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </ProtectedRoute>
  );
}

function ProtectedFullscreenLayout() {
  return <ProtectedLayout fullscreen />;
}

// Protected fullscreen layout (for reel feed)
const protectedFullscreenRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-fullscreen",
  component: ProtectedFullscreenLayout,
});

// Protected standard layout
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: () => <ProtectedLayout fullscreen={false} />,
});

const homeRoute = createRoute({
  getParentRoute: () => protectedFullscreenRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomeFeedPage />
    </Suspense>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SearchPage />
    </Suspense>
  ),
});

const createRoute_ = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/create",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CreatePage />
    </Suspense>
  ),
});

const earnRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/earn",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EarnPage />
    </Suspense>
  ),
});

const walletRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/wallet",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WalletPage />
    </Suspense>
  ),
});

const profileMeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile/me",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const profileUserRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile/$userId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedFullscreenRoute.addChildren([homeRoute]),
  protectedRoute.addChildren([
    searchRoute,
    createRoute_,
    earnRoute,
    walletRoute,
    profileMeRoute,
    profileUserRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
