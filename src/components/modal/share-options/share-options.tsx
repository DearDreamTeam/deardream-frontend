import ShareHeader from "./share-header";
import IconsBox from "./icons-box";
import LinkCopy from "./link-copy";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { SetIsOpenType } from "@/types/set-open-type";

const ShareOptions = ({ setIsOpen }: { setIsOpen: SetIsOpenType }) => {
  const { modalRef, closeModal } = useOutsideClick<HTMLDivElement>(setIsOpen);

  return (
    <div className="modal-container-b">
      <div className="modal-bg" />
      <div
        ref={modalRef}
        className="modal-main w-full rounded-sm px-5 py-6 md:w-lg"
      >
        <ShareHeader closeModal={closeModal} />
        <IconsBox />
        <LinkCopy />
      </div>
    </div>
  );
};

export default ShareOptions;
