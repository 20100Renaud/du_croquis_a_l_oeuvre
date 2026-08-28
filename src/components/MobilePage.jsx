export default function MobilePage({ page }) {
  if (page.type === "intro") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <img
          src={coverImage}
          alt="Artist logo"
          className="mb-8 w-32 object-contain"
        />

        <h1 className="text-2xl font-bold">{page.artist.name}</h1>

        <p className="mt-1 text-sm text-base-content/60">
          {page.artist.subtitle}
        </p>

        <p className="mt-8 text-sm leading-relaxed text-base-content/80">
          {page.artist.description}
        </p>
      </div>
    );
  }

  if (page.type === "image") {
    return (
      <img
        src={page.src}
        alt=""
        draggable="false"
        className="h-full w-full select-none object-contain"
      />
    );
  }

  return null;
}

