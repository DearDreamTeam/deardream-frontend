"use client";

const GreenBasicButton = ({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean; // 버튼 비활성화 여부
}) => {
  return (
    <button
      type="submit"
      className={`px-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        disabled
          ? "bg-grey-200 text-grey-500 cursor-not-allowed"
          : "text-grey-0 bg-green-300"
      } cursor-pointer`}
      aria-disabled={disabled}
    >
      <div className="text-headline-3">{children}</div>
    </button>
  );
};
export default GreenBasicButton;
