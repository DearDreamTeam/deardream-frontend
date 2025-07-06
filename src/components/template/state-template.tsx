const StateTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

const ImageFiled = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative my-4 flex h-56 w-full items-center justify-center">
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-headline-1 py-2">{children}</h1>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-label-2 text-grey-600 py-0 text-center">{children}</h1>
);

const Action = ({ children }: { children: React.ReactNode }) => (
  <div className="self-center py-4">{children}</div>
);

StateTemplate.ImageFiled = ImageFiled;
StateTemplate.Title = Title;
StateTemplate.Content = Content;
StateTemplate.Action = Action;

export default StateTemplate;
