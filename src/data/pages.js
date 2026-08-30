import Logo_Blanc from "../assets/images/Logo_Blanc.png";
import Logo_Noir from "../assets/images/Logo_Noir.png";

export const bookInfo = {
  name: "Marilyne",
  subtitle: "Mes premiers pas au crochet",
  date: "2025-2026",
  description:
    "J’ai attrapé le virus du crochet en 2025 après m’être lancé au tricot. Une révélation instantanée !<br><br>Cette nouvelle activité est devenu mon exutoire créatif, une façon de transformer des pelotes en objets pleins de douceur et de sens.<br><br>Voici quelques-unes de mes réalisations préférées, nées de cette passion.",
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
  .map(([path, image]) => {
    const filename = path.split("/").pop();
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");

    const [number, ...nameParts] = nameWithoutExtension.split("_");

    return {
      type: "image",
      number: Number(number),
      name: nameParts.join("_").replace(/_/g, " "),
      src: image,
    };
  })
  .sort((a, b) => a.number - b.number);

export const totalPages = sortedPageImages.length;

export const pages = [{ type: "text" }, ...sortedPageImages];

export const sheets = Array.from({ length: Math.ceil(totalPages / 2) }, (_, index) => {
  const front = sortedPageImages[index * 2];
  const back = sortedPageImages[index * 2 + 1];

  return [
    front,
    back ?? {
      type: "end",
      name: "The End",
    },
  ];
});
