const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="modal-container">
      <div className="modal-bg" />
      <div className="modal-main rounded-lg">{children}</div>
    </div>
  );
};

const Message = ({ children }: { children: React.ReactNode }) => (
  <p className="text-label-2 min-w-2xs border-b border-b-gray-200 px-4 py-7 text-center">
    {children}
  </p>
);

const Actions = ({ children }: { children: React.ReactNode }) => (
  <div className="text-title-1 flex justify-center">{children}</div>
);

Dialog.Message = Message;
Dialog.Actions = Actions;

export default Dialog;
