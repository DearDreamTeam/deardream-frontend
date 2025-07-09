const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="modal-container">
      <div className="modal-bg" />
      <div className="modal-main rounded-lg">{children}</div>
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-title-2 text-center">{children}</h1>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <p className="text-label-2 text-center">{children}</p>
);

const Message = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b-grey-200 flex min-w-2xs flex-col items-center justify-center gap-2 border-b px-4 py-7">
    {children}
  </div>
);

const Actions = ({ children }: { children: React.ReactNode }) => (
  <div className="text-title-1 flex justify-center">{children}</div>
);

Dialog.Title = Title;
Dialog.Content = Content;
Dialog.Message = Message;
Dialog.Actions = Actions;

export default Dialog;
