"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(callback: () => void) {
  document.addEventListener("mylesnet-theme-change", callback);
  return () => document.removeEventListener("mylesnet-theme-change", callback);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("mylesnet-theme", next);
    } catch {
      // Keep theme switching available when browser storage is blocked.
    }
    document.dispatchEvent(new Event("mylesnet-theme-change"));
  }

  return <button type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-net-border bg-net-neutral-50 text-net-accent hover:bg-net-surface">{theme === "dark" ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}</button>;
}
