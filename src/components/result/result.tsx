import EllipseImage from "../images/ellipse-image";
import StateTemplate from "../template/state-template";

interface ResultProps {
  title: string;
  description: string;
  description2?: string;
  description3?: string;
  description4?: string;
}

const Result = ({
  title,
  description,
  description2,
  description3,
  description4,
}: ResultProps) => {
  return (
    <StateTemplate>
      <StateTemplate.ImageFiled>
        <EllipseImage color="green-100" isBackground={false} />
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
