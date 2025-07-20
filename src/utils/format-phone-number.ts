export const formatPhoneNumber = (value: string): string => {
  const onlyNums = value.replace(/\D/g, "");

  // 2자리 지역번호 (서울 02)일 경우
  if (onlyNums.startsWith("02")) {
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 5)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    if (onlyNums.length <= 9)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 5)}-${onlyNums.slice(5)}`;
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
  }

  // 3자리 지역번호 또는 휴대폰번호 (ex: 010, 031 등)
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  if (onlyNums.length <= 10)
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};
