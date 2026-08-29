import { useState } from "react";
import FlipBook from "./components/FlipBook";
import MobileBook from "./components/MobileBook";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className="min-h-dvh bg-base-200 text-base-content flex flex-col items-center justify-center">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="hidden md:block">
        <FlipBook />
      </div>

      <div className="block w-full md:hidden">
        <MobileBook darkMode={darkMode} />
      </div>

      <Footer />
    </main>
  );
}
