import FileCopy from "@/public/icons/share-options/file-copy.svg";

const LinkCopy = () => {
  return (
    <div className="flex flex-col text-gray-500">
      <p className="text-caption-2 p-1 text-center">또는 링크 복사하기</p>
      <div className="rounded-25 flex gap-1 bg-gray-50 px-4 py-2">
        <span className="flex-1"></span>
        <button className="text-gray-900">
          <FileCopy />
        </button>
      </div>
    </div>
  );
};

export default LinkCopy;
