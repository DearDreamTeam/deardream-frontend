import Checked from "@/public/icons/buttons/checkbox-checked.svg";
import UnChecked from "@/public/icons/buttons/checkbox-default.svg";
import { CheckboxProps } from "./checkbox-props";

const Checkbox = ({
  idValue,
  callback,
  isChecked,
}: {
  idValue: number;
  callback: CheckboxProps;
  isChecked: boolean;
}) => {
  const handleCheckboxClick = () => {
    callback(idValue, !isChecked); // 부모 상태를 직접 토글
  };

  return (
    <button type="button" onClick={handleCheckboxClick}>
      {isChecked ? <Checked /> : <UnChecked />}
    </button>
  );
};

export default Checkbox;
