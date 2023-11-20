import { ArrowLeft, ArrowRight } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";

interface Props {
  loadPage: (pageNum: number) => Promise<number | undefined>;
  numPages: number;
}
const ReaderToolbar = ({ numPages, loadPage }: Props) => {
  const [pageNum, setPageNum] = useState(1);


  const nextPage = () => {
    setPageNum(prev => {
      if(prev + 1 > numPages) return prev;
      return prev + 1;
    });
  };

  const prevPage = () => {
    setPageNum(prev => {
      if (prev - 1 <= 0) return prev;
      return prev - 1;
    });
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      switch(event.keyCode) {
        case 37:
          prevPage();
          break
        case 39:
          nextPage();
          break;
        default:
          return;
      }

    }

    window.addEventListener('keydown', keyPressHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler)
    }
  }, [numPages])


  useEffect(() => {
    setTimeout(() => {
      loadPage(pageNum);
    }, 200)
  }, [pageNum]);

  return (
      <div class="flex gap-4 absolute left-1/2 bg-slate-800 p-4 rounded-md top-5 -translate-x-1/2">
        <button onClick={prevPage} disabled={pageNum === 1} class="disabled:opacity-50"><ArrowLeft /></button>

        <div>{pageNum}</div>
        <button onClick={nextPage} disabled={pageNum === numPages} class="disabled:opacity-50"><ArrowRight /></button>
      </div>
  );
};

export default ReaderToolbar;
