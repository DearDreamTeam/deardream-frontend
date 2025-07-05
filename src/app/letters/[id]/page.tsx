import { PATH } from "@/constants/path";
import ArrowBack from "@/public/icons/letters/arrow-back.svg";
import Download from "@/public/icons/letters/download.svg";
import Link from "next/link";
import PdfViewer from "./_components/pdf-viewer";

const PdfPage = () => {
  return (
    <div>
      <header className="text-title-1 header justify-between py-[0.66rem]">
        <div className="flex items-center">
          <Link href={PATH.LETTER_LIST}>
            <ArrowBack />
          </Link>
          <h1>2025년 5월호</h1>
        </div>
        <button>
          <Download />
        </button>
      </header>

      <div className="p-4">
        <PdfViewer />
      </div>
    </div>
  );
};

export default PdfPage;
