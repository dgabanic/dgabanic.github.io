import { useState, useEffect, useCallback } from "react";
import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import ProfessionalSection from "./components/professional/ProfessionalSection";
import PersonalSection from "./components/personal/PersonalSection";
import ReadingList from "./components/books/ReadingList";
import TravelMap from "./components/map/TravelMap";
import FavoritesList from "./components/favorites/FavoritesList";
import Schedules from "./components/schedules/Schedules";
import AdminPage from "./components/admin/AdminPage";
import ShoppingList from "./components/shopping/ShoppingList";
import favoriteBeers from "./data/favoriteBeers";
import favoriteJerseys from "./data/favoriteJerseys";

type Theme = "light" | "dark";
type Page =
  | "home"
  | "books"
  | "map"
  | "beers"
  | "jerseys"
  | "schedules"
  | "shopping"
  | "admin";

const PATH_TO_PAGE: Record<string, Page> = {
  "/": "home",
  "/books": "books",
  "/map": "map",
  "/beers": "beers",
  "/jerseys": "jerseys",
  "/schedules": "schedules",
  "/shopping": "shopping",
  "/admin": "admin",
};

const PAGE_TO_PATH: Record<Page, string> = {
  home: "/",
  books: "/books",
  map: "/map",
  beers: "/beers",
  jerseys: "/jerseys",
  schedules: "/schedules",
  shopping: "/shopping",
  admin: "/admin",
};

function getPageFromPath(): Page {
  return PATH_TO_PAGE[window.location.pathname] || "home";
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromPath);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    }
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navigateTo = useCallback((p: string) => {
    const target = p as Page;
    const path = PAGE_TO_PATH[target] || "/";
    window.history.pushState(null, "", path);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (page === "admin") {
    return (
      <main className={styles.mainPanel}>
        <AdminPage onBack={() => navigateTo("home")} />
      </main>
    );
  }

  return (
    <>
      <Navbar>
        <button
          style={{
            marginLeft: "clamp(0.5rem, 5vw, 2rem)",
            padding: "0.4rem 1rem",
            borderRadius: "1rem",
            border: "none",
            background: theme === "dark" ? "#444" : "#eee",
            color: theme === "dark" ? "#fff" : "#222",
            cursor: "pointer",
            fontSize: "0.875rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={toggleTheme}
        >
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </Navbar>
      <main className={styles.mainPanel}>
        {page === "home" ? (
          <>
            <HeroSection />
            <ProfessionalSection />
            <PersonalSection onNavigate={navigateTo} />
          </>
        ) : page === "books" ? (
          <ReadingList onBack={() => navigateTo("home")} />
        ) : page === "map" ? (
          <TravelMap onBack={() => navigateTo("home")} />
        ) : page === "beers" ? (
          <FavoritesList
            heading="Favorite Beers"
            emoji="🍺"
            items={favoriteBeers}
            onBack={() => navigateTo("home")}
          />
        ) : page === "jerseys" ? (
          <FavoritesList
            heading="Favorite Soccer Jerseys"
            emoji="⚽"
            items={favoriteJerseys}
            onBack={() => navigateTo("home")}
          />
        ) : page === "schedules" ? (
          <Schedules onBack={() => navigateTo("home")} />
        ) : page === "shopping" ? (
          <ShoppingList onBack={() => navigateTo("home")} />
        ) : null}
      </main>
    </>
  );
}

export default App;
