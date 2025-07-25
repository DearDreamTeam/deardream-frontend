import Image from "next/image";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="absolute top-0 left-0 -z-10 h-[28rem] w-full bg-gradient-to-b from-green-100/100 via-green-100/80 to-green-100/0">
        <Image
          src={`/images/white-big-ribbon.svg`}
          alt="ribbon"
          width={284.23}
          height={250.49}
          className="absolute top-36 left-4 z-10"
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
