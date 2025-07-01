import Dropdown from "./dropdown";

const SortOptions = () => {
  const lettersCount = 5;
  return (
    <div className="text-title-3 flex items-center justify-between text-gray-600">
      <div>
        {lettersCount}
        <span>개</span>
      </div>
      <Dropdown />
    </div>
  );
};

export default SortOptions;
