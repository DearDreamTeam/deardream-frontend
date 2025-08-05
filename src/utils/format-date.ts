export const formatDateToDots = (timestamp: string) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const isAm = hour < 12;
  const period = isAm ? "오전" : "오후";
  hour = isAm ? (hour === 0 ? 12 : hour) : hour - 12;

  return `${year}.${month}.${day} ${period} ${hour}:${minutes}`;
};

export const formatDateForNewsletter = (yearMonthType: string) => {
  const [year, month] = yearMonthType.split("년");

  return `${year}년 ${month} 호`;
};
