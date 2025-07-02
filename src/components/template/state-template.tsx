import Image from "next/image";

const StateTemplate = ({
  bgSrc = "/images/ellipse/green-100.png",
  src,
  width = 129.43,
  children,
}: {
  bgSrc?: string;
  src: string;
  width?: number;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative my-[1.79rem] flex h-56 w-full items-center justify-center">
        <Image
          src={bgSrc}
          alt={"background image"}
          width={400}
          height={400}
          className="absolute z-10"
        />
        <Image
          src={src}
          alt={"main image"}
          width={width}
          height={110}
          className="absolute z-20"
        />
      </div>

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
  <div className="self-center py-7">{children}</div>
);

StateTemplate.Title = Title;
StateTemplate.Content = Content;
StateTemplate.Action = Action;

export default StateTemplate;
