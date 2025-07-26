import Image from "next/image";

const EllipseImage = ({
  color,
  isBackground,
  style,
}: {
  color: string;
  isBackground?: boolean;
  style?: string;
}) => (
  <Image
    src={`/images/ellipse/${color}.png`}
    alt="ellipse-image"
    width={350}
    height={350}
    className={`${style} ${isBackground ? "absolute -z-10" : undefined}`}
  />
);

export default EllipseImage;
