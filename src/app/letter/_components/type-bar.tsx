const TypeBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-grey-0 border-y-grey-200 flex items-center justify-between border-y px-5 py-4">
      {children}
    </div>
  );
};

export default TypeBar;
