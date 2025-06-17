const TypeBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-0 flex items-center justify-between border-y border-y-gray-200 p-4">
      {children}
    </div>
  );
};

export default TypeBar;
