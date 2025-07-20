import React from "react";

const MoreAdd = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="text-title-2 border-grey-200 flex w-full items-center justify-center border p-4"
    >
      <span className="text-grey-500 flex items-center px-1">+ 더 추가</span>
    </button>
  );
};

export default MoreAdd;
