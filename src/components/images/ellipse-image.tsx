import Image from "next/image";

const EllipseImage = ({
  color,
  isBackground,
}: {
  color: string;
  isBackground?: boolean;
}) => (
  <Image
    src={`/images/ellipse/${color}.png`}
    alt="ellipse-image"
    width={350}
    height={350}
    className={isBackground ? "absolute z-10" : undefined}
  />
);

export default EllipseImage;
