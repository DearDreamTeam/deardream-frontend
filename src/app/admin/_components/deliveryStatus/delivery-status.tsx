import Print from "@/public/icons/delivery-status/print.svg";
import Truck from "@/public/icons/delivery-status/delivery_truck_speed.svg";
import PostOffice from "@/public/icons/delivery-status/local_post_office.svg";
import { DELIVERY_STATUS } from "@/constants/delivery-status";

export const PendingState = () => {
  return (
    <button className="admin-delivery-status">
      <Print />
      <span>{DELIVERY_STATUS.PENDING.label}</span>
    </button>
  );
};

export const ShippingState = () => {
  return (
    <button className="admin-delivery-status">
      <Truck />
      <span>{DELIVERY_STATUS.SHIPPING.label}</span>
    </button>
  );
};

export const DeliveredState = () => {
  return (
    <button className="admin-delivery-status">
      <PostOffice />
      <span>{DELIVERY_STATUS.DELIVERED.label}</span>
    </button>
  );
};

export const DeliveryStatus = (status: string) => {
  if (status === DELIVERY_STATUS.PENDING.value) return <PendingState />;
  if (status === DELIVERY_STATUS.SHIPPING.value) return <ShippingState />;
  if (status === DELIVERY_STATUS.DELIVERED.value) return <DeliveredState />;
};
