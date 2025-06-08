import ShareHeader from "./share-header";
import IconsBox from "./icons-box";
import LinkCopy from "./link-copy";

const ShareOptions = () => {
  return (
    <div className="modal-container-b">
      <div className="modal-bg" />
      <div className="modal-main rounded-25 px-[0.94rem] py-2">
        <ShareHeader />
        <IconsBox />
        <LinkCopy />
      </div>
    </div>
  );
};

export default ShareOptions;
