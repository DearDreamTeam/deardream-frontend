const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shadow-default bg-gray-0 z-50 rounded-lg">{children}</div>
  );
};

const Message = ({ children }: { children: React.ReactNode }) => (
  <p className="text-label-2 w-2xs border-b border-b-gray-200 px-4 py-7 text-center">
    {children}
  </p>
);

const Actions = ({ children }: { children: React.ReactNode }) => (
  <div className="text-title-1 flex justify-center">{children}</div>
);

Dialog.Message = Message;
Dialog.Actions = Actions;

export default Dialog;
