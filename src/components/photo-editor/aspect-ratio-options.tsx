const ASPECT_RATIO_ITEMS = [
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

const AspectItem = ({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) => {
  const color = isActive ? "bg-gray-50" : "text-gray-50";
  return (
    <div
      onClick={onClick}
      className={`rounded-25 px-7 py-1 ${color} hover:bg-gray-800 hover:text-gray-50`}
    >
      {label}
    </div>
  );
};

const AspectRatioOptions = ({
  aspectRatio,
  setAspectRatio,
}: {
  aspectRatio: number;
  setAspectRatio: (ration: number) => void;
}) => {
  return (
    <div className="text-body-2 flex h-full w-full justify-around gap-2 py-4 select-none">
      {ASPECT_RATIO_ITEMS.map(({ label, value }) => (
        <AspectItem
          key={label}
          isActive={aspectRatio === value}
          label={label}
          onClick={() => setAspectRatio(value)}
        />
      ))}
    </div>
  );
};

export default AspectRatioOptions;
