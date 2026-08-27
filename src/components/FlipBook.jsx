import { useState } from "react";

import flipBookEdgeShading from "../assets/images/flip_book_edge_shading.webp";
import frontPageEdgeShading from "../assets/images/front_page_edge_shading.webp";
import backPageEdgeShading from "../assets/images/back_page_edge_shading.webp";
import coverImage from "../assets/images/Logo_Blanc.png";

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

import FlipPage from "./FlipPage";

const pages = [
  [page1, page2],
  [page3, page4],
  [page5, page6],
  [page7, page8],
  [page9, page10],
];

function FlipBook() {
  const [currentSheet, setCurrentSheet] = useState(0);
  const isBookOpen = currentSheet > 0;
  const currentPage = currentSheet === 0 ? 0 : currentSheet - 1;

  function handleCoverClick() {
    if (currentSheet === 0) {
      setCurrentSheet(1);
    } else {
      setCurrentSheet(0);
    }
  }

  function handlePageClick(pageNumber, side) {
    setCurrentSheet((current) => {
      if (side === "front" && current === pageNumber) {
        return pageNumber + 1;
      }

      if (side === "back" && current === pageNumber + 1) {
        return pageNumber;
      }

      return current;
    });
  }

  return (
    <div
      className={`flip-book ${isBookOpen ? "is-open" : ""}`}
      style={{
        transform: isBookOpen ? "translateX(144px)" : "translateX(0)",
      }}
    >
      <div
        className={`front-cover ${isBookOpen ? "is-open" : ""}`}
        style={{
          backgroundImage: `url(${flipBookEdgeShading})`,
        }}
      >
        <div
          className={`pointer-events-none relative flex h-full flex-col items-center justify-around text-white transition-opacity duration-300 ${
            isBookOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={coverImage}
            alt="Flip Book cover"
            className="w-4/5 object-contain p-10"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Flip Book</h1>
            <p className="text-sm opacity-80">Mon nom</p>
          </div>
        </div>

        <button
          type="button"
          className="absolute inset-0 cursor-pointer"
          onClick={handleCoverClick}
          aria-label={isBookOpen ? "Close book" : "Open book"}
        />
      </div>

      {pages.map(([front, back], index) => {
        const pageNumber = index + 1;

        return (
          <FlipPage
            key={pageNumber}
            pageNumber={pageNumber}
            front={front}
            back={back}
            isFlipped={currentSheet > pageNumber}
            zIndex={getPageZIndex(pageNumber, currentSheet)}
            onClick={handlePageClick}
            frontPageEdgeShading={frontPageEdgeShading}
            backPageEdgeShading={backPageEdgeShading}
          />
        );
      })}

      <div
        className="back-cover"
        style={{
          backgroundImage: `url(${flipBookEdgeShading})`,
        }}
      >
        <button
          type="button"
          className="absolute inset-0 cursor-pointer"
          onClick={() => setCurrentSheet(0)}
          aria-label="Close book"
        />
      </div>

      {isBookOpen &&
        currentSheet > 1 && (
            <div className="mt-4 text-sm text-base-content/70">
              {currentPage}/{pages.length}
            </div>
          )}
    </div>
  );
}

function getPageZIndex(pageNumber, currentSheet) {
  if (currentSheet === pageNumber + 1) {
    return 9;
  }

  return Math.max(2, 8 - pageNumber);
}

export default FlipBook;
