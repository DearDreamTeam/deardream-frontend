const ItemCount = ({ count }: { count: number }) => {
  return (
    <div className="text-title-1 text-grey-600 px-5 py-6">전체 {count}건</div>
  );
};

export default ItemCount;
