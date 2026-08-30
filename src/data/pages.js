import Logo_Blanc from "../assets/images/Logo_Blanc.png";
import Logo_Noir from "../assets/images/Logo_Noir.png";

export const bookInfo = {
  name: "Marilyne",
  subtitle: "Mes premiers pas au crochet",
  date: "2025-2026",
  description:
    "J’ai attrapé le virus du crochet en 2025 après m’être lancé au tricot. Une révélation instantanée !<br><br>Cette nouvelle activité est devenu mon exutoire créatif, une façon de transformer des pelotes en objets pleins de douceur et de sens.<br><br>Voici quelques-unes de mes réalisations préférées, nées de cette nouvelle passion.",
  image: {
    dark: Logo_Blanc,
    light: Logo_Noir,
  },
};

const pageImages = import.meta.glob(
  "../assets/images/pages/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
);

const sortedPageImages = Object.entries(pageImages)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  )
  .map(([, image]) => image);

export const pages = [
  { type: "text" },
  ...sortedPageImages.map((src) => ({
    type: "image",
    src,
  })),
];

export const sheets = Array.from(
  { length: Math.ceil(sortedPageImages.length / 2) },
  (_, index) =>
    [sortedPageImages[index * 2], sortedPageImages[index * 2 + 1]].filter(
      Boolean,
    ),
);
