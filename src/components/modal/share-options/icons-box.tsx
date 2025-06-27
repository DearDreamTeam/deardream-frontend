"use client";

import { SHARE_OPTION_ITEMS } from "@/constants/share-option-items";
import IconItem from "./icon-item";

const IconsBox = () => {
  return (
    <div className="flex items-center justify-around gap-[0.65rem] py-4">
      {SHARE_OPTION_ITEMS.map(({ icon: Icon, label, action }) => (
        <IconItem key={label} icon={<Icon />} label={label} action={action} />
      ))}
    </div>
  );
};

export default IconsBox;
