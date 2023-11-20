import { BaseDirectory, readDir } from '@tauri-apps/api/fs';
import { create } from 'zustand'

interface LibraryState {
  books: Book[],
  initLibrary: () => void;
}

const useLibraryStore = create<LibraryState>((set, get) => ({
  books: [],
  initLibrary: async () => {
    const books = await readDir('doclib', { dir: BaseDirectory.Home })

    const bookList = books.map((book, index) => ({ id: index, name: book.name, path: book.path}))
    set({ books: bookList })
  }
}));


export default useLibraryStore;