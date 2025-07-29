"use client";

import { SHARE_OPTION_ITEMS } from "@/components/modal/share-options/share-option-items";
import IconItem from "./icon-item";
import { useInvitationStore } from "@/stores/useInvitationStore";

const IconsBox = () => {
  const { familyLink } = useInvitationStore();
  return (
    <div className="text-grey-700 flex items-center justify-around gap-6 py-4">
      {SHARE_OPTION_ITEMS.map(({ icon: Icon, label, action }) => (
        <IconItem
          key={label}
          icon={<Icon />}
          label={label}
          action={() => action(familyLink ?? "")}
        />
      ))}
    </div>
  );
};

export default IconsBox;
