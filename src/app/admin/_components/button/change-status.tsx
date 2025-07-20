const ChangeStatus = ({ selectedItemCount }: { selectedItemCount: number }) => {
  return (
    <button className="button">{selectedItemCount}건 일괄 상태 변경</button>
  );
};

export default ChangeStatus;
