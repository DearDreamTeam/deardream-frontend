const IconItem = ({
  icon,
  label,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-[0.32rem]">
      <button
        onClick={action}
        className="bg-grey-50 flex items-center justify-center rounded-[1.52rem] p-[0.97rem]"
      >
        {icon}
      </button>
      <div className="text-body-2">{label}</div>
    </div>
  );
};

export default IconItem;
