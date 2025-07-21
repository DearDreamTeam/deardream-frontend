import { DAUM_POSTCODE_SCRIPT_URL } from "@/constants/daum-postcode-script-url";
import { useDaumPostcodePopup } from "react-daum-postcode";

const PostcodePopup = ({
  handleAddress,
}: {
  handleAddress: (postalCode: string, address: string) => void;
}) => {
  const open = useDaumPostcodePopup(DAUM_POSTCODE_SCRIPT_URL);

  const handleComplete = (data: {
    zonecode: string;
    address: string;
    bname: string;
    buildingName: string;
    addressType: string;
  }) => {
    const postcode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    handleAddress(postcode, fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  return (
    <button
      className="admin-fill-button mx-auto bg-green-100 text-green-300"
      type="button"
      onClick={handleClick}
    >
      우편번호 찾기
    </button>
  );
};

export default PostcodePopup;
