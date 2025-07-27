import Image from "next/image";

const PaymentImage = () => (
  <Image
    src={"/images/payment.png"}
    alt="payment-image"
    width={120}
    height={100}
    className="z-20"
  />
);

export default PaymentImage;
