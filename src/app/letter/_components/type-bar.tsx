const TypeBar = ({ children }: { children: React.ReactNode }) => {
  /* 이미지가 추가된 상태면 200자, 이미지가 없는 상태면 600자 제한 설정 */

  return (
    <div className="bg-gray-0 flex items-center justify-between border-y border-y-gray-200 p-4">
      {children}
    </div>
  );
};

export default TypeBar;
