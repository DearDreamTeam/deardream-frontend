"use client";
import { PATH } from "@/constants/path";
import ArrowBack from "@/public/icons/common/arrow-back.svg";
import Download from "@/public/icons/common/download.svg";
import Link from "next/link";
import PdfViewer from "@/components/pdf-viewer/pdf-viewer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PdfPage = () => {
  const searchParams = useSearchParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    setPdfUrl(searchParams.get("pdfUrl"));
    setTitle(searchParams.get("title"));
  }, [searchParams]);

  if (!pdfUrl || !title) return null; // 또는 로딩 스피너 렌더
  return (
    <div className="bg-grey-500 h-full">
      <header className="text-title-1 header justify-between py-[0.66rem]">
        <div className="flex items-center">
          <Link href={PATH.LETTER_LIST} className="text-grey-600">
            <ArrowBack />
          </Link>
          <h1>{title}</h1>
        </div>
        <a href={pdfUrl!} download>
          <Download />
        </a>
      </header>

      <div className="p-4">
        <PdfViewer pdfSrc={pdfUrl!} />
      </div>
    </div>
  );
};

export default PdfPage;
