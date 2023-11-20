import { useEffect, useRef, useState } from "preact/hooks";
import useLibraryStore from "../store/libraryStore";
import { readBinaryFile } from "@tauri-apps/api/fs";
import ReaderToolbar from "../components/Reader/ReaderToolbar";
import useDocument from "../hooks/useDocument";
import { Loader } from "lucide-preact";

interface Props {
  id: string;
}
const Book = ({ id }: Props) => {
  const canvasRef = useRef();
  const [book, setBook] = useState<File>();
  const books = useLibraryStore(state => state.books) as Book[];

  useEffect(() => {
    const loadFile = async () => {
      const b = books.find(item => item.id === parseInt(id));

      if(b) {
        const uint8Array = await readBinaryFile(b.path);
        const fileBlob = new File([uint8Array], b.name);

        setBook(fileBlob);
      }
    }

    loadFile()
  }, [id, books]);

  const { pdfDoc, loadPage, isReady, canvasSize, loading } = useDocument({
    canvas: canvasRef.current,
    pdfFile: book,
  });

  useEffect(() => {
    loadPage(1);
  }, [isReady]);

  if(!book) {
    return(
      <div class="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div class="relative w-max flex-1 aspect-[5/7] mx-auto">
      { (!isReady || loading ) && <div class="bg-slate-600/50 h-full w-full flex items-center justify-center"><Loader /></div>}

      <ReaderToolbar numPages={pdfDoc?.numPages || 1} loadPage={loadPage} />
      <canvas
        {...canvasSize}
        class="w-full"
        ref={canvasRef}
      />
    </div>
  );
};

export default Book;
