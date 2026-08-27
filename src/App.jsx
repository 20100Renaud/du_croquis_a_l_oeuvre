import { useState } from "react";
import FlipBook from "./components/FlipBook";
import ThemeToggle from "./components/ThemeToggle";
import ResponsiveWarning from "./components/ResponsiveWarning";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className="min-h-dvh bg-base-200 text-base-content flex flex-col items-center justify-center">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <FlipBook />
      <Footer />

      <ResponsiveWarning />
    </main>
  );
}

export default App;
