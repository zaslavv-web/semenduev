import { useEffect } from "react";
import { Outlet, Link, createRootRoute, useNavigate } from "@tanstack/react-router";
import { ContentProvider } from "@/lib/content/ContentProvider";
import { RequestDialogProvider } from "@/components/site/RequestDialog";
import { AnalyticsScripts } from "@/components/site/AnalyticsScripts";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.includes("error=")) {
      const params = new URLSearchParams(hash.slice(1));
      const code = params.get("error_code");
      const desc = params.get("error_description");
      if (code === "otp_expired" || params.get("error") === "access_denied") {
        toast.error(
          "Ссылка для восстановления недействительна или уже использована. Запросите новую."
        );
      } else if (desc) {
        toast.error(decodeURIComponent(desc.replace(/\+/g, " ")));
      }
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && window.location.pathname !== "/reset-password") {
        navigate({ to: "/reset-password" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  return (
    <ContentProvider>
      <RequestDialogProvider>
        <Outlet />
        <AnalyticsScripts />
        <Toaster />
      </RequestDialogProvider>

    </ContentProvider>
  );
}

