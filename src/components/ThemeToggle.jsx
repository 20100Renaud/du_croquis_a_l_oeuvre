import { useEffect } from "react";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "black" : "light",
    );
  }, [darkMode]);

  function handleToggle(event) {
    setDarkMode(event.target.checked);
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex w-full justify-end p-4">
      <label className="swap swap-rotate cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
          aria-label="Toggle dark mode"
        />

        <span className="swap-on text-xl">
          <MoonStar />
        </span>
        <span className="swap-off text-xl">
          <Sun />
        </span>
      </label>
    </div>
  );
}
