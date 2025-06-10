const ActionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="header text-title-3 h-[2.88rem] justify-between">
      {children}
    </div>
  );
};

export default ActionHeader;
