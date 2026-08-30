import { useEffect, useRef, useState } from "react";

import coverShade from "../assets/images/coverShade.webp";
import frontShade from "../assets/images/frontShade.webp";
import backShade from "../assets/images/backShade.webp";

import { bookInfo, sheets } from "../data/pages";

import FlipPage from "./FlipPage";

const PAGE_FLIP_DURATION = 500;
const CLOSE_PAGE_DELAY = 80;
const COVER_FLIP_DURATION = 1500;
const COVER_Z_INDEX_SWITCH = 750;

export default function FlipBook() {
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isCoverBehind, setIsCoverBehind] = useState(false);
  const [isBackCoverVisible, setIsBackCoverVisible] = useState(false);
  const [isCoverClosing, setIsCoverClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);


  const coverTimerRef = useRef(null);
  const backCoverTimerRef = useRef(null);

  const isBookOpen = currentSheet > 0;
  const currentPage = currentSheet;

  // Close all the pages
  useEffect(() => {
    if (!isClosing) {
      return;
    }

    if (currentSheet > 1) {
      const timer = setTimeout(() => {
        setCurrentSheet((current) => current - 1);
      }, CLOSE_PAGE_DELAY);

      return () => clearTimeout(timer);
    }

    if (currentSheet === 1) {
      setIsCoverBehind(false);
      setIsCoverClosing(true);

      const timer = setTimeout(() => {
        setCurrentSheet(0);
        setIsClosing(false);
        setIsCoverClosing(false);
        setIsAnimating(false);
      }, PAGE_FLIP_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isClosing, currentSheet]);

  // Clear timeouts
  useEffect(() => {
    return () => {
      if (coverTimerRef.current) {
        clearTimeout(coverTimerRef.current);
      }

      if (backCoverTimerRef.current) {
        clearTimeout(backCoverTimerRef.current);
      }
    };
  }, []);

  // Cover click
  function handleCoverClick() {
    if (isAnimating || isClosing) {
      return;
    }

    if (currentSheet === 0) {
      setIsAnimating(true);
      setIsCoverClosing(false);
      setCurrentSheet(1);

      coverTimerRef.current = setTimeout(() => {
        setIsCoverBehind(true);
        setIsAnimating(false);
      }, COVER_Z_INDEX_SWITCH);

      return;
    }

    setIsAnimating(true);
    setIsCoverClosing(true);
    setIsCoverBehind(false);
    setCurrentSheet(0);

    coverTimerRef.current = setTimeout(() => {
      setIsCoverClosing(false);
      setIsAnimating(false);
    }, COVER_FLIP_DURATION);
  }

  // Back Cover click
  function handleBackCoverClick() {
    if (isAnimating || isClosing) {
      return;
    }

    setIsAnimating(true);
    setIsBackCoverVisible(false);
    setIsClosing(true);
    setCurrentSheet(sheets.length);
  }

  // Page click
  function handlePageClick(pageNumber, side) {
    if (isAnimating || isClosing) {
      return;
    }

    if (
      side === "front" &&
      pageNumber === sheets.length &&
      currentSheet === pageNumber
    ) {
      setIsAnimating(true);
      setCurrentSheet(sheets.length + 1);

      backCoverTimerRef.current = setTimeout(() => {
        setIsBackCoverVisible(true);
        setIsAnimating(false);
      }, PAGE_FLIP_DURATION);

      return;
    }

    if (
      side === "back" &&
      pageNumber === sheets.length &&
      currentSheet === sheets.length + 1
    ) {
      setIsAnimating(true);
      setIsBackCoverVisible(false);
      setCurrentSheet(sheets.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, PAGE_FLIP_DURATION);

      return;
    }

    const isValidPageTurn =
      (side === "front" && currentSheet === pageNumber) ||
      (side === "back" && currentSheet === pageNumber + 1);

    if (!isValidPageTurn) {
      return;
    }

    setIsAnimating(true);

    setCurrentSheet((current) => {
      if (side === "front" && current === pageNumber) {
        return pageNumber + 1;
      }

      if (side === "back" && current === pageNumber + 1) {
        return pageNumber;
      }

      return current;
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, PAGE_FLIP_DURATION);
  }

  return (
    <div
      className={`flip-book ${isBookOpen ? "is-open" : "is-closed"}`}
      style={{
        transform: isBookOpen ? "translateX(144px)" : "translateX(0)",
      }}
    >
      {/* FRONT COVER */}
      <div
        className={`front-cover ${
          isCoverClosing ? "is-closed" : isBookOpen ? "is-open" : "is-closed"
        }`}
        style={{
          backgroundImage: `url(${coverShade})`,
          zIndex: isCoverBehind ? 1 : 99,
        }}
      >
        {/* Front of cover */}
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-between text-white transition-opacity duration-300 ${
            isCoverClosing
              ? "opacity-100 delay-400"
              : isBookOpen
                ? "opacity-0 delay-300"
                : "opacity-100"
          }`}
        >
          <img
            src={bookInfo.image.dark}
            alt={`${bookInfo.name} cover`}
            className="w-4/5 object-contain p-10"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{bookInfo.name}</h1>

            <p className="text-sm opacity-80">{bookInfo.subtitle}</p>
          </div>
          <p className="text-xs opacity-80 mb-2">{bookInfo.date}</p>
        </div>

        {/* Inside of front cover */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 ${
            isCoverClosing
              ? "opacity-0 delay-300"
              : isBookOpen
                ? "opacity-100 delay-300"
                : "opacity-0"
          }`}
        >
          <div className="flex w-4/5 rotate-y-180 flex-col items-center text-center h-full pt-8">
            <div>
              <h1 className="text-3xl font-bold">{bookInfo.name}</h1>
              <p className="text-sm opacity-80">{bookInfo.subtitle}</p>
            </div>

            <p
              className="text-sm flex-1 flex items-center"
              dangerouslySetInnerHTML={{ __html: bookInfo.description }}
            />
          </div>
        </div>

        <button
          type="button"
          className="absolute inset-0 cursor-pointer"
          onClick={handleCoverClick}
          aria-label={isBookOpen ? "Close book" : "Open book"}
        />
      </div>

      {/* PAGES */}
      {sheets.map(([front, back], index) => {
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
            frontShade={frontShade}
            backShade={backShade}
          />
        );
      })}

      {/* BACK COVER */}
      <div
        className="back-cover"
        style={{
          backgroundImage: `url(${coverShade})`,
          zIndex: isBackCoverVisible ? 101 : 0,
        }}
      >
        <img
          src={bookInfo.image.dark}
          alt={`${bookInfo.name} cover`}
          className="w-4/5 object-contain p-10"
        />

        <button
          type="button"
          className="absolute inset-0 cursor-pointer"
          onClick={handleBackCoverClick}
          aria-label="Close book"
        />
      </div>

      {/* PAGE COUNTER */}
      {isBookOpen && (
        <div className="absolute top-full left-0 mt-4 text-sm text-base-content/70">
          {currentPage}/{sheets.length + 1}
        </div>
      )}
    </div>
  );
}

function getPageZIndex(pageNumber, currentSheet) {
  if (pageNumber === currentSheet - 1) {
    return 99;
  }

  if (pageNumber === currentSheet) {
    return 98;
  }

  if (pageNumber < currentSheet - 1) {
    return 80 - (currentSheet - pageNumber);
  }

  return 70 - (pageNumber - currentSheet);
}
