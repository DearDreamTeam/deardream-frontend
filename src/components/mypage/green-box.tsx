const QuitItem = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="text-label-2 mt-4 flex w-full justify-between bg-green-100 px-6 py-4">
      <p>{text}</p>
      <p className="text-label-1">{children}</p>
    </div>
  );
};
export default QuitItem;
