import page1 from "../assets/images/pages/page1.webp";
import page2 from "../assets/images/pages/page2.webp";
import page3 from "../assets/images/pages/page3.webp";
import page4 from "../assets/images/pages/page4.webp";
import page5 from "../assets/images/pages/page5.webp";
import page6 from "../assets/images/pages/page6.webp";
import page7 from "../assets/images/pages/page7.webp";
import page8 from "../assets/images/pages/page8.webp";
import page9 from "../assets/images/pages/page9.webp";
import page10 from "../assets/images/pages/page10.webp";
import coverImage from "../assets/images/Logo_Blanc.png";

export const pages = [
  {
    type: "text",
    image: coverImage,
    artist: {
      name: "Nom de l'artiste",
      subtitle: "Intitulé",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  },

  {
    type: "image",
    src: page2,
  },

  {
    type: "image",
    src: page3,
  },

  {
    type: "image",
    src: page4,
  },

  {
    type: "image",
    src: page5,
  },
  {
    type: "image",
    src: page6,
  },
  {
    type: "image",
    src: page7,
  },

  {
    type: "image",
    src: page8,
  },

  {
    type: "image",
    src: page9,
  },

  {
    type: "image",
    src: page10,
  },
];


export const sheets = [
  [page1, page2],
  [page3, page4],
  [page5, page6],
  [page7, page8],
  [page9, page10],
];
