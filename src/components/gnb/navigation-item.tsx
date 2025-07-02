const NavigationItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-[0.19]">{children}</div>
  );
};

export default NavigationItem;
