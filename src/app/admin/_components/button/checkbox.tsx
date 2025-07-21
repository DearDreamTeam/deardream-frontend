"use client";

import { useEffect, useState } from "react";
import Checked from "@/public/icons/buttons/checkbox-checked.svg";
import UnChecked from "@/public/icons/buttons/checkbox-default.svg";
import { CheckboxProps } from "./checkbox-props";

const Checkbox = ({
  idValue,
  callback,
}: {
  idValue: number;
  callback: CheckboxProps;
}) => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxClick = () => setChecked((prev) => !prev);

  useEffect(() => {
    callback(idValue, checked);
  }, [checked]);

  return (
    <button type="button" onClick={handleCheckboxClick}>
      {checked ? <Checked /> : <UnChecked />}
    </button>
  );
};

export default Checkbox;
