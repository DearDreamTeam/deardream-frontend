const RedSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-center5 flex items-center rounded-[39px] outline outline-1 outline-offset-[-1px] outline-rose-500">
      <span className="flex items-center px-2 py-1 text-xs font-medium text-rose-500">
        {children}
      </span>
    </div>
  );
};
export default RedSpan;
