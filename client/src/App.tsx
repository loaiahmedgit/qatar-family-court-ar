import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ChatGuide } from "./components/ChatGuide";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import FamilyServices from "./pages/FamilyServices";

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <WouterRouter base={routerBase || undefined}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/family-services" component={FamilyServices} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function InitialAnchorScroll() {
  useEffect(() => {
    const anchor = decodeURIComponent(window.location.hash.slice(1));
    if (!anchor) return;

    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView({ block: "start" });
        });
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return null;
}

function AppContent() {
  return (
    <ErrorBoundary>
      <InitialAnchorScroll />
      <Router />
      <ChatGuide />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
