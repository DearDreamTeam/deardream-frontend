import Image from "next/image";

const AirplaneImage = () => (
  <Image
    src={"/images/airplane.png"}
    alt="airplane-image"
    width={200}
    height={200}
    className="absolute z-20"
  />
);

export default AirplaneImage;
