import { ASPECT_RATIO_ITEMS } from "@/types/editable-image";

const AspectItem = ({
  isActive,
  label,
  // onClick,
}: {
  isActive: boolean;
  label: string;
  // onClick: () => void;
}) => {
  const color = isActive ? "bg-grey-50" : "text-grey-50";
  return (
    <div
      // onClick={onClick}
      className={`rounded-sm px-7 py-1 ${color}`}
    >
      {label}
    </div>
  );
};

const AspectRatioOptions = ({
  aspectRatio,
  // setAspectRatio,
}: {
  aspectRatio: number;
  // setAspectRatio: (ration: number) => void;
}) => {
  return (
    <div className="text-body-2 flex h-full w-full justify-around gap-2 py-4 select-none">
      {ASPECT_RATIO_ITEMS.map(({ label, value }) => (
        <AspectItem
          key={label}
          isActive={aspectRatio === value}
          label={label}
          // onClick={() => setAspectRatio(value)}
        />
      ))}
    </div>
  );
};

export default AspectRatioOptions;
