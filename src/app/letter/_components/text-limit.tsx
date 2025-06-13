interface TextLimitProps {
  imgLength: number;
  typedLength: number;
}

const TextLimit = ({ imgLength, typedLength }: TextLimitProps) => {
  const textLimit = imgLength > 0 ? 200 : 600;
  const color = typedLength < textLimit ? "text-gray-600" : "text-main-red-300";

  return (
    <div className={`text-caption-2 flex gap-1 ${color}`}>
      <span className="min-w-[1.825rem] text-end">{typedLength}</span>
      <span>/{textLimit}자</span>
    </div>
  );
};

export default TextLimit;
