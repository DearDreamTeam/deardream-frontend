import Image from "next/image";

const EmptyStateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="relative my-5 h-72 w-[17.1rem] self-center">
        <Image
          src={"/images/background-ellipse.png"}
          alt={"img"}
          width={273.42}
          height={273.42}
          className="absolute bottom-10 z-10 self-center"
        />
        <Image
          src={"/images/mailbox-3d.svg"}
          alt={"홈페이지 이미지"}
          width={273.42}
          height={273.42}
          className="absolute bottom-0 z-20 self-center"
        />
      </div>

      {children}
    </div>
  );
};

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2">{children}</div>
);

const Action = ({ children }: { children: React.ReactNode }) => (
  <div className="self-center py-4">{children}</div>
);

EmptyStateLayout.Text = Text;
EmptyStateLayout.Action = Action;

export default EmptyStateLayout;
