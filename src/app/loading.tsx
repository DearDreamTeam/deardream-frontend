import Image from "next/image";

const LOADING_SRCS = [
  "/images/ribbon/ribbon-1.svg",
  "/images/ribbon/ribbon-2.svg",
  "/images/ribbon/ribbon-3.svg",
  "/images/ribbon/ribbon-4.svg",
  "/images/ribbon/ribbon-full.svg",
];

const Loading = () => {
  return (
    <div>
      {LOADING_SRCS.map((src, index) => (
        <Image
          src={src}
          alt={`loader${index}`}
          key={`loader${index}`}
          width={130}
          height={110}
        />
      ))}
    </div>
  );
};

export default Loading;
