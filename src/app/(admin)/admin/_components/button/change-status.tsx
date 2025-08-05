const ChangeStatus = ({
  selectedItemCount,
  onClick,
}: {
  selectedItemCount: number;
  onClick: () => void;
}) => {
  return (
    <button className="button" onClick={onClick}>
      {selectedItemCount}건 일괄 상태 변경
    </button>
  );
};

export default ChangeStatus;
