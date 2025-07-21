import { AdminCommonDto } from "@/types/admin-dto";
import Link from "next/link";
import Download from "@/public/icons/common/download.svg";

export const DownloadPdf = ({
  pdfUrl,
  isDownloaded,
}: Pick<AdminCommonDto, "pdfUrl"> & {
  isDownloaded: boolean;
}) => {
  return (
    <Link
      href={pdfUrl}
      className={`admin-fill-button ${isDownloaded ? "bg-grey-100 text-grey-300" : "bg-green-100 text-green-300"}`}
    >
      <Download />
      <span>다운로드</span>
    </Link>
  );
};
