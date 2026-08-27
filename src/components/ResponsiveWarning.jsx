import { useEffect, useState } from "react";
import { Fullscreen } from "lucide-react";

function ResponsiveWarning() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function checkScreenSize() {
      setIsSmallScreen(window.innerWidth <= 768);
    }

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!isSmallScreen) {
    return null;
  }

  return (
    <dialog open className="modal backdrop-blur-xl">
      <div className="modal-box max-w-xs rounded-xl bg-base-300 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-4xl">
            <Fullscreen size={46} />
          </div>

          <p className="text-lg font-semibold">
            Cette application est conçue pour les écrans supérieurs à 768px.
          </p>

          <p className="text-xs">
            Une version adaptée aux appareils mobiles sera bientôt disponible...
          </p>
        </div>
      </div>
    </dialog>
  );
}

export default ResponsiveWarning;
