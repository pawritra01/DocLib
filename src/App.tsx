import Router from "preact-router";
import Home from "./pages/Home";
import { useEffect } from "preact/hooks";
import Settings from "./pages/Settings";
import Book from "./pages/Book";
import Navbar from "./components/layout/Navbar";
import { BaseDirectory, createDir, exists } from "@tauri-apps/api/fs";
import useLibraryStore from "./store/libraryStore";

function App() {
  const initLibrary = useLibraryStore(state => state.initLibrary);

  const initializeAppStorage = async () => {
    exists('doclib', { dir: BaseDirectory.Home }).then(isPresent => {
      if (!isPresent) {
        return createDir('doclib', { dir: BaseDirectory.Home, recursive: true });
      }
    }).then(() => {
      initLibrary();
    }).catch(err => {
      console.log(err);
    });
  }

  const initializeAppColorScheme = () => {
    const localColorScheme = localStorage.getItem("color-scheme");
    if (localColorScheme === "dark") {
      document.body.classList.add(localColorScheme);
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }

  useEffect(() => {
    initializeAppColorScheme()
    initializeAppStorage();
  }, []);

  return (
    <main class="min-h-screen dark:bg-slate-800 bg-blue-50 text-slate-800 dark:text-white flex flex-col">
      <Navbar />
      <Router>
        <Home path="/" />
        <Book path="/:id" />
        <Settings path="/settings" />
      </Router>
    </main>
  );
}

export default App;
