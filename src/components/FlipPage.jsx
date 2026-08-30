export default function FlipPage({
  pageNumber,
  front,
  back,
  isFlipped,
  zIndex,
  onClick,
  frontShade,
  backShade,
}) {
  function PageContent({ page, className }) {
    if (page.type === "end") {
      return (
        <div
          className={`${className} flex items-center justify-center bg-white`}
        >
          <div className="text-center">
            <p className="text-3xl font-semibold italic text-gray-500">
              Fin
            </p>
          </div>
        </div>
      );
    }

    return (
      <img
        className={`${className} object-cover object-center`}
        src={page.src}
        alt={page.name}
      />
    );
  }

  return (
    <div
      className={`book-page ${isFlipped ? "is-flipped" : ""}`}
      style={{ zIndex }}
    >
      {/* FRONT */}
      <div className="front-page">
        <button
          type="button"
          className="absolute inset-0 z-[100] cursor-pointer"
          onClick={() => onClick(pageNumber, "front")}
          aria-label={`Turn page ${pageNumber}`}
        />

        <img className="edge-shading" src={frontShade} alt="" />

        <PageContent page={front} className="front-content" />

        {front.type !== "end" && front.name && (
          <p
            className="absolute bottom-4 right-4 z-[99] bg-white/60 px-4 text-sm italic text-gray-500"
            style={{
              clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
            }}
          >
            {front.name}
          </p>
        )}
      </div>

      {/* BACK */}
      <div className="back-page">
        <button
          type="button"
          className="absolute inset-0 z-[100] cursor-pointer"
          onClick={() => onClick(pageNumber, "back")}
          aria-label={`Turn back page ${pageNumber}`}
        />

        <img className="edge-shading" src={backShade} alt="" />

        <PageContent page={back} className="back-content" />

        {back.type !== "end" && back.name && (
          <p
            className="absolute bottom-4 left-4 z-[99] bg-white/60 px-4 text-sm italic text-gray-500"
            style={{
              clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
            }}
          >
            {back.name}
          </p>
        )}
      </div>
    </div>
  );
}
