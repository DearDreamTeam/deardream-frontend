"use client";

import { useEffect, useState } from "react";
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
  isChecked?: boolean;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleCheckboxClick = () => setChecked((prev) => !prev);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
      setIsInitialized(true);
    }
  }, [isChecked]);

  useEffect(() => {
    if (isInitialized) {
      callback(idValue, checked);
    }
  }, [checked, isInitialized]);

  return (
    <button type="button" onClick={handleCheckboxClick}>
      {checked ? <Checked /> : <UnChecked />}
    </button>
  );
};

export default Checkbox;
