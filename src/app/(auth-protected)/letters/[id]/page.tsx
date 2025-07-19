import { PATH } from "@/constants/path";
import ArrowBack from "@/public/icons/common/arrow-back.svg";
import Download from "@/public/icons/common/download.svg";
import Link from "next/link";
import PdfViewer from "@/components/pdf-viewer/pdf-viewer";

const PdfPage = () => {
  const pdfSrc = "/mock/1.pdf";
  return (
    <div className="bg-grey-500 h-full">
      <header className="text-title-1 header justify-between py-[0.66rem]">
        <div className="flex items-center">
          <Link href={PATH.LETTER_LIST} className="text-grey-600">
            <ArrowBack />
          </Link>
          <h1>2025년 5월호</h1>
        </div>
        <a href={pdfSrc} download>
          <Download />
        </a>
      </header>

      <div className="p-4">
        <PdfViewer pdfSrc={pdfSrc} />
      </div>
    </div>
  );
};

export default PdfPage;
