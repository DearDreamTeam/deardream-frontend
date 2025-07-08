import Cancel from "@/public/icons/common/cancel.svg";
import Reverse from "@/public/icons/photo-editor/reverse.svg";
import Rotate from "@/public/icons/photo-editor/rotate.svg";
import Apply from "@/public/icons/photo-editor/apply.svg";

const ActionIconBar = ({
  onClose,
  toggleFlipX,
  rotateLeft,
  onSave,
}: {
  onClose: () => void;
  toggleFlipX: () => void;
  rotateLeft: () => void;
  onSave: () => Promise<void>;
}) => {
  return (
    <div className="text-grey-50 flex h-full w-full justify-between">
      <button type="button" onClick={onClose}>
        <Cancel />
      </button>
      <div className="flex gap-5">
        <button type="button" onClick={toggleFlipX}>
          <Reverse />
        </button>
        <button type="button" onClick={rotateLeft}>
          <Rotate />
        </button>
      </div>
      <button type="button" onClick={onSave}>
        <Apply />
      </button>
    </div>
  );
};

export default ActionIconBar;
