"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div
      className="h-full max-w-full overflow-auto"
      onClick={() => setPageNumber((prev) => prev + 1)}
    >
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file="/mock/1.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfViewer;
