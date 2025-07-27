import AirplaneImage from "@/components/images/airplane-image";
import EllipseImage from "@/components/images/ellipse-image";
import FamilyImage from "@/components/images/family-image";
import HouseImage from "@/components/images/house-image";
import PaymentImage from "../images/payment-image";
import StateTemplate from "../template/state-template";

interface ResultProps {
  title: string;
  description: string;
  description2?: string;
  description3?: string;
  description4?: string;
  imageType?: "airplane" | "payment" | "house" | "family";
}

const Result = ({
  title,
  description,
  description2,
  description3,
  description4,
  imageType,
}: ResultProps) => {
  return (
    <StateTemplate>
      <StateTemplate.ImageFiled>
        <EllipseImage color="green-100" isBackground={true} />
        {imageType && imageType === "airplane" && <AirplaneImage />}
        {imageType && imageType === "payment" && <PaymentImage />}
        {imageType && imageType === "house" && <HouseImage />}
        {imageType && imageType === "family" && <FamilyImage />}
      </StateTemplate.ImageFiled>
      <StateTemplate.Title> {title}</StateTemplate.Title>
      <StateTemplate.Content>
        <p className="text-label-2 text-center">{description}</p>
        {description2 && (
          <p className="text-label-2 text-center">{description2}</p>
        )}
        {description3 && (
          <p className="text-label-2 text-center">{description3}</p>
        )}{" "}
        {description4 && (
          <p className="text-label-2 text-center">{description4}</p>
        )}
      </StateTemplate.Content>
    </StateTemplate>
  );
};
export default Result;
