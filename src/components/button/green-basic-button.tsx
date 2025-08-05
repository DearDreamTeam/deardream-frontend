"use client";

import { useRouter } from "next/navigation";

const GreenBasicButton = ({
  children,
  disabled = false,
  link,
  newTab = false,
  onClick,
  color,
}: {
  children: React.ReactNode;
  disabled?: boolean; // 버튼 비활성화 여부
  link?: string; // 링크가 있을 경우 사용
  color?: string; // 버튼 색상
  newTab?: boolean; // 새 탭으로 열지 여부
  onClick?: () => void; // 클릭 핸들러
}) => {
  const router = useRouter();
  return (
    <button
      type="submit"
      className={`px-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        disabled
          ? "bg-grey-200 text-grey-500 cursor-not-allowed"
          : `${color == "300" ? "text-grey-0" : "text-color-300"} bg-green-${color}`
      } cursor-pointer`}
      aria-disabled={disabled}
      onClick={() => {
        if (newTab && link) {
          window.location.href = link;
        } else if (link) {
          router.push(link);
        } else if (onClick) {
          onClick();
        }
      }}
      disabled={disabled} // 버튼이 비활성화된 경우
    >
      <div className="text-headline-3">{children}</div>
    </button>
  );
};
export default GreenBasicButton;
