import { useRef, useState } from "react";
import { pages } from "../data/pages";

export default function MobileBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;

  const previousPage = currentPage > 0 ? currentPage - 1 : null;
  const nextPage = currentPage < pages.length - 1 ? currentPage + 1 : null;

  function getWidth() {
    return containerRef.current?.offsetWidth ?? 300;
  }

  function handleTouchStart(event) {
    if (isAnimating) {
      return;
    }

    touchStartX.current = event.touches[0].clientX;
    setIsDragging(true);
  }

  function handleTouchMove(event) {
    if (touchStartX.current === null || isAnimating) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const offset = currentX - touchStartX.current;

    if ((isFirstPage && offset > 0) || (isLastPage && offset < 0)) {
      setDragOffset(offset * 0.25);
      return;
    }

    setDragOffset(offset);
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || isAnimating) {
      return;
    }

    const swipeThreshold = 80;

    const shouldGoNext = dragOffset < -swipeThreshold && !isLastPage;

    const shouldGoPrevious = dragOffset > swipeThreshold && !isFirstPage;

    if (shouldGoNext) {
      completeSwipe("next");
    } else if (shouldGoPrevious) {
      completeSwipe("previous");
    } else {
      cancelSwipe();
    }

    touchStartX.current = null;
    setIsDragging(false);
  }

  function completeSwipe(direction) {
    const width = getWidth();

    setIsAnimating(true);

    setDragOffset(direction === "next" ? -width : width);

    setTimeout(() => {
      setDisableTransition(true);
      setCurrentPage((page) => (direction === "next" ? page + 1 : page - 1));
      setDragOffset(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
          setIsAnimating(false);
        });
      });
    }, 300);
  }

  function cancelSwipe() {
    setIsAnimating(true);
    setDragOffset(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }

  function goToNextPage() {
    if (isLastPage || isAnimating) {
      return;
    }

    completeSwipe("next");
  }

  function goToPreviousPage() {
    if (isFirstPage || isAnimating) {
      return;
    }

    completeSwipe("previous");
  }

  function getScale(index) {
    const width = getWidth();
    const position = index * width + dragOffset;

    const progress = Math.min(Math.abs(position) / width, 1);

    return 1 - progress * 0.15;
  }

  function getOpacity(index) {
    const width = getWidth();
    const position = index * width + dragOffset;

    const progress = Math.min(Math.abs(position) / width, 1);

    return 1 - progress * 0.25;
  }

  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* Pages viewport */}
      <div
        ref={containerRef}
        className="relative aspect-[288/400] w-full max-w-md overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Track */}
        <div
          className="absolute inset-y-0 left-0 flex"
          style={{
            width: "300%",
            transform: `translateX(calc(-33.333333% + ${dragOffset}px))`,
            transition:
              isDragging || disableTransition
                ? "none"
                : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Previous */}
          <div className="flex h-full w-1/3 shrink-0 items-center justify-center">
            {previousPage !== null && (
              <img
                src={pages[previousPage]}
                alt={`Book page ${previousPage + 1}`}
                draggable="false"
                className="h-full w-full select-none object-contain"
                style={{
                  transform: `scale(${getScale(-1)})`,
                  opacity: getOpacity(-1),
                  transition: "none",
                }}
              />
            )}
          </div>

          {/* Current */}
          <div className="flex h-full w-1/3 shrink-0 items-center justify-center">
            <img
              src={pages[currentPage]}
              alt={`Book page ${currentPage + 1}`}
              draggable="false"
              className="h-full w-full select-none object-contain"
              style={{
                transform: `scale(${getScale(0)})`,
                opacity: getOpacity(0),
                transition: "none",
              }}
            />
          </div>

          {/* Next */}
          <div className="flex h-full w-1/3 shrink-0 items-center justify-center">
            {nextPage !== null && (
              <img
                src={pages[nextPage]}
                alt={`Book page ${nextPage + 1}`}
                draggable="false"
                className="h-full w-full select-none object-contain"
                style={{
                  transform: `scale(${getScale(1)})`,
                  opacity: getOpacity(1),
                  transition: "none",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="relative mt-4 flex w-full max-w-md items-center justify-between">
        {/* Previous */}
        <button
          type="button"
          className="btn btn-circle btn-ghost"
          onClick={goToPreviousPage}
          disabled={isFirstPage || isAnimating}
          aria-label="Previous page"
        >
          <span className="text-2xl">‹</span>
        </button>

        {/* Counter / Hint */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm text-base-content/70">
          {currentPage === 0
            ? "Swipe to turn"
            : `${currentPage + 1}/${pages.length}`}
        </span>

        {/* Next */}
        <button
          type="button"
          className="btn btn-circle btn-ghost"
          onClick={goToNextPage}
          disabled={isLastPage || isAnimating}
          aria-label="Next page"
        >
          <span className="text-2xl">›</span>
        </button>
      </div>
    </div>
  );
}
