import { bookInfo } from "../data/pages";

export default function MobilePageContent({ page, index, darkMode }) {
  if (page.type === "text") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-between p-8 text-center">
        <img
          src={darkMode ? bookInfo.image.dark : bookInfo.image.light}
          alt={`${bookInfo.name} logo`}
          className="mb-8 w-32 object-contain"
          draggable="false"
        />

        <div>
          <h1 className="text-2xl font-bold">{bookInfo.name}</h1>
          <p className="mt-1 text-sm text-base-content/60">
            {bookInfo.subtitle}
          </p>
          <p
            className="mt-8 text-sm text-base-content/80"
            dangerouslySetInnerHTML={{ __html: bookInfo.description }}
          />
        </div>
        <p className="text-xs opacity-80">{bookInfo.date}</p>
      </div>
    );
  }

  return (
    <img
      src={page.src}
      alt={`Page ${index + 1}`}
      className="h-full w-full select-none object-cover object-center rounded-lg border-2 bg-white"
      draggable="false"
    />
  );
}
