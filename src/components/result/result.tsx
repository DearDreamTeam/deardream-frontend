import EllipseImage from "../images/ellipse-image";

interface ResultProps {
  title: string;
  description: string;
}

const Result = ({ title, description }: ResultProps) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <EllipseImage color="green-100" />
      <div className="text-headline-3">{title}</div>
      <div className="text-label-2 text-grey-600">{description}</div>
    </div>
  );
};
export default Result;
