import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/display/api";
import { useEffect, useRef, useState } from "preact/hooks";


interface Props {
  canvas?: HTMLCanvasElement;
  pdfFile?: File;
}
const useDocument = ({ canvas, pdfFile }: Props) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const pdfDoc = useRef<PDFDocumentProxy>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [isReady, setIsReady] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });

  console.log(loading, isReady);

  useEffect(() => {
    if (!pdfFile) return;
    const fileReader = new FileReader();

    fileReader.onload = (response) => {
        const loadedFile = response.target?.result as ArrayBuffer;
        pdfjsLib.getDocument(loadedFile).promise.then((pdf) => {
          pdfDoc.current = pdf;
          setIsReady(true);
        }).catch(err => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        });
    };

    fileReader.readAsArrayBuffer(pdfFile);
    fileReader.onloadstart = () => setLoading(true);
  }, [pdfFile]);

  const loadPage = async (pageNum: number) => {
    if (!canvas) return;
    if (pageNum < 1 || pageNum > pdfDoc.current.numPages) return pageNum;

    try {
      setLoading(true);
      const page = await pdfDoc.current.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });
      setCanvasSize({ width: viewport.width, height: viewport.height });

      const renderContext = {
        canvasContext: canvas.getContext("2d"),
        viewport,
      };

      await page.render(renderContext);
      setLoading(false);
      return pageNum;
    } catch (err) {
      setError(err);
    }
  };

  return {
    pdfDoc: pdfDoc.current,
    canvasSize,
    isReady,
    loading,
    error,
    loadPage,
  };
};

export default useDocument;
