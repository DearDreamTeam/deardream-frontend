import Image from "next/image";

const HouseImage = () => (
  <Image
    src={"/images/house.png"}
    alt="house-image"
    width={200}
    height={200}
    className="absolute z-20"
  />
);

export default HouseImage;
