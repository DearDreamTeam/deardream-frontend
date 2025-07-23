import Notification from "@/public/icons/common/notifications.svg";

const PeriodNotification = () => {
  const date = new Date();
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return (
    <div className="px-4 py-2">
      <div className="flex w-full items-center justify-center gap-1 rounded-sm bg-green-100 px-4 text-green-300">
        <Notification />
        <small className="text-caption-1">
          오늘부터 {lastDate.getMonth() + 1}월 {lastDate.getDate()}일까지
          작성하는 소식은 {lastDate.getMonth() + 1}월 호에 수록돼요
        </small>
      </div>
    </div>
  );
};

export default PeriodNotification;
