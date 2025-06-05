import Image from "next/image";
const Header = () => {
  return (
    <header className="bg-gray-0 border-b border-b-gray-200 px-4 py-[0.875rem]">
      <Image
        src={"/logo/logo.svg"}
        alt={"이어드림 로고"}
        width={100}
        height={31}
      />
    </header>
  );
};

export default Header;
