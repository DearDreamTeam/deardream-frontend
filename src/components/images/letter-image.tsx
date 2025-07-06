import Image from "next/image";

const LetterImage = () => (
  <Image
    src={"/images/mail.png"}
    alt="mail-image"
    width={180}
    height={120}
    className="absolute z-20"
  />
);

export default LetterImage;
