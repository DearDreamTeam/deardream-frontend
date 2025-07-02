import Dropdown from "./dropdown";

const SortOptions = () => {
  const lettersCount = 5;
  return (
    <div className="text-title-3 text-grey-600 flex items-center justify-between">
      <div>
        {lettersCount}
        <span>개</span>
      </div>
      <Dropdown />
    </div>
  );
};

export default SortOptions;
