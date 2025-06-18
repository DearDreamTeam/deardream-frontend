"use client";

import { SHARE_OPTION_ITEMS } from "@/constants/share-option-items";
import IconItem from "./icon-item";
import KakaoShareScript from "./kakao-share-script";

const IconsBox = () => {
  return (
    <div className="flex items-center justify-around gap-[0.65rem] py-4">
      {SHARE_OPTION_ITEMS.map(({ icon: Icon, label, action }) => (
        <div key={label}>
          {label === "카카오톡" && <KakaoShareScript />}
          <IconItem icon={<Icon />} label={label} action={action} />
        </div>
      ))}
    </div>
  );
};

export default IconsBox;
