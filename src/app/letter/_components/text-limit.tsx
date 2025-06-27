import { getTextLimitByImageCount } from "@/utils/post-content-rules";

interface TextLimitProps {
  imageCount: number;
  typedLength: number;
}

const TextLimit = ({ imageCount, typedLength }: TextLimitProps) => {
  const textLimit = getTextLimitByImageCount(imageCount);
  const color =
    typedLength <= textLimit ? "text-gray-600" : "text-main-red-300";

  return (
    <div className={`text-caption-2 flex gap-1 ${color}`}>
      <span className="min-w-[1.825rem] text-end">{typedLength}</span>
      <span>/{textLimit}자</span>
    </div>
  );
};

export default TextLimit;
