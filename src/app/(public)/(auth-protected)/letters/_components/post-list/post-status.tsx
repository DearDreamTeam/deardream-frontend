import Pending from "@/public/icons/letters/status/pending.svg";
import Delivery from "@/public/icons/letters/status/delivery.svg";

export const PendingPost = () => {
  return (
    <div className="post-status pointer-events-none">
      <Pending />
      <span>준비 중</span>
    </div>
  );
};

export const ShippingPost = () => {
  return (
    <div className="post-status">
      <Delivery />
      <span>배송 중</span>
    </div>
  );
};
