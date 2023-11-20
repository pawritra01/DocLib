import { Link } from "preact-router/match";

interface Props {
  book?: Book;
}
const LibraryBook = ({ book }: Props) => {
  return (
    <Link href={`/${book.id}`}>
      <div
        class="aspect-[3/4] w-100 bg-slate-50 border border-slate-50 text-slate-800 relative cursor-pointer overflow-hidden"
      >
        <img src="https://i.pinimg.com/originals/a1/f8/87/a1f88733921c820db477d054fe96afbb.jpg" />
        <div class="group absolute bottom-0 left-0 bg-white/50 w-full p-2 transition-all">
          <div class="font-semibold text-sm truncate group-hover:whitespace-pre">{book?.name || "Book Name"}</div>
          <div class="text-xs hidden group-hover:block">{book?.author || "Book Author"}</div>
          <div class="text-xs hidden group-hover:block">Added on: {book?.dateAdded|| "26th September"}</div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryBook;
