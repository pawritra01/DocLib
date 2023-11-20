import LibraryBook from "./LibraryBook";
import useLibraryStore from "../store/libraryStore";

const Library = () => {
    const books = useLibraryStore(state => state.books);

    return (
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            { books.map(book => <LibraryBook book={{ id: book.id, name: book.name}}/>)}
        </div>
    )
}

export default Library;