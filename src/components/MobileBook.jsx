import { useRef, useState } from "react";
import { bookInfo, pages } from "../data/pages";
import { LayoutGrid, House } from "lucide-react";
import MobilePage from "./MobilePage";


export default function MobileBook({ darkMode }) {
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

  function handleTouchEnd(event) {
    if (touchStartX.current === null || isAnimating) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    const swipeThreshold = 50;

    const shouldGoNext = swipeDistance < -swipeThreshold && !isLastPage;

    const shouldGoPrevious = swipeDistance > swipeThreshold && !isFirstPage;

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

  const MIN_SCALE = 0.4;

  function getPageScale(offset, width, isIncoming = false) {
    if (!width) return 1;

    const progress = Math.min(Math.abs(offset) / width, 1);

    if (isIncoming) {
      return MIN_SCALE + progress * (1 - MIN_SCALE);
    }

    return 1 - progress * (1 - MIN_SCALE);
  }



  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* MOBILE BOOK */}
      <div
        ref={containerRef}
        className="relative aspect-[288/400] w-full max-w-md overflow-hidden"
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
          {/* Previous page */}
          <div
            className="flex h-full w-1/3 shrink-0 items-center justify-center"
            style={{
              transform:
                dragOffset > 0
                  ? `scale(${getPageScale(dragOffset, getWidth(), true)})`
                  : "scale(0.92)",
              transition:
                isDragging || disableTransition
                  ? "none"
                  : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {previousPage !== null && (
              <MobilePageContent
                page={pages[previousPage]}
                index={previousPage}
                darkMode={darkMode}
              />
            )}
          </div>

          {/* Current page */}
          <div
            className="flex h-full w-1/3 shrink-0 items-center justify-center"
            style={{
              transform:
                dragOffset === 0
                  ? "scale(1)"
                  : `scale(${getPageScale(dragOffset, getWidth())})`,
              transition:
                isDragging || disableTransition
                  ? "none"
                  : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <MobilePage
              page={pages[currentPage]}
              index={currentPage}
              darkMode={darkMode}
            />
          </div>

          {/* Next page */}
          <div
            className="flex h-full w-1/3 shrink-0 items-center justify-center"
            style={{
              transform:
                dragOffset < 0
                  ? `scale(${getPageScale(dragOffset, getWidth(), true)})`
                  : "scale(0.92)",
              transition:
                isDragging || disableTransition
                  ? "none"
                  : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {nextPage !== null && (
              <MobilePage
                page={pages[nextPage]}
                index={nextPage}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="relative mt-4 flex w-full max-w-md items-center justify-between">
        {/* Buttons */}
        <div className="">
          {/* thumbnails btn */}
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={() =>
              document.getElementById("mobile-pages-modal").showModal()
            }
            aria-label="Show all pages"
          >
            <LayoutGrid size={20} />
          </button>
          {/* Home btn */}
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={() => setCurrentPage(0)}
            disabled={isFirstPage}
            aria-label="Go to first page"
          >
            <House size={20} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-between">
          {/* Previous arrow */}
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={goToPreviousPage}
            disabled={isFirstPage}
            aria-label="Previous page"
          >
            <span className="text-2xl">‹</span>
          </button>

          {/* Counter / Swipe text */}
          <span className="text-sm text-base-content/70">
            {currentPage === 0
              ? "Swipe to turn"
              : `${currentPage + 1}/${pages.length}`}
          </span>

          {/* Next arrow */}
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={goToNextPage}
            disabled={isLastPage}
            aria-label="Next page"
          >
            <span className="text-2xl">›</span>
          </button>
        </div>
      </div>

      {/* THUMBAILS MODAL*/}
      <dialog id="mobile-pages-modal" className="modal">
        <div className="modal-box w-full max-w-none h-full max-h-none scrollbar-none">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gallerie</h2>

            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost"
                aria-label="Close"
              >
                ✕
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {pages.map((page, index) => (
              <button
                key={index}
                type="button"
                className="flex w-full flex-col items-center overflow-hidden rounded border"
                onClick={() => {
                  setCurrentPage(index);
                  document.getElementById("mobile-pages-modal").close();
                }}
              >
                <div className="aspect-[288/400] w-full overflow-hidden rounded-t">
                  {page.type === "text" ? (
                    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-2 text-center">
                      <img
                        src={
                          darkMode ? bookInfo.image.dark : bookInfo.image.light
                        }
                        alt={`${bookInfo.name} logo`}
                        className="mb-2 w-10 shrink-0 object-contain"
                      />

                      <h1 className="truncate text-sm font-bold">
                        {bookInfo.name}
                      </h1>

                      <p className="truncate text-[10px] text-base-content/60">
                        {bookInfo.subtitle}
                      </p>

                      <p className="mt-2 line-clamp-4 text-[9px] leading-tight text-base-content/70">
                        {bookInfo.description}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={page.src}
                      alt={`Page ${index + 1}`}
                      className="h-full w-full select-none object-cover object-center"
                      draggable="false"
                    />
                  )}
                </div>

                <span
                  className={`mt-1 rounded-full border-2 px-1 text-xs transition ${
                    currentPage === index
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}
