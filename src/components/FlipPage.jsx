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
  return (
    <div
      className={`book-page ${isFlipped ? "is-flipped" : ""}`}
      style={{ zIndex }}
    >
      <div className="front-page">
        <button
          type="button"
          className="absolute inset-0 z-[100] cursor-pointer"
          onClick={() => onClick(pageNumber, "front")}
          aria-label={`Turn page ${pageNumber}`}
        />

        <img className="edge-shading" src={frontShade} alt="" />

        <img
          className="front-content"
          src={front}
          alt={`Book page ${pageNumber * 2 - 1}`}
        />
      </div>

      <div className="back-page">
        <button
          type="button"
          className="absolute inset-0 z-[100] cursor-pointer"
          onClick={() => onClick(pageNumber, "back")}
          aria-label={`Turn back page ${pageNumber}`}
        />

        <img className="edge-shading" src={backShade} alt="" />

        <img
          className="back-content"
          src={back}
          alt={`Book page ${pageNumber * 2}`}
        />
      </div>
    </div>
  );
}
