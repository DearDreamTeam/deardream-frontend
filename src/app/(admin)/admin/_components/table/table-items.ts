export type TableItemsType = {
  value: string;
  label: string;
  flex: string;
}[];

export const INDIVIDUALS_TABLE_ITEMS = [
  { value: "index", label: "번호", flex: "flex-[1]" },
  { value: "name", label: "성함", flex: "flex-[2]" },
  { value: "address", label: "주소", flex: "flex-[6]" },
  { value: "addressDetail", label: "상세 주소", flex: "flex-[6]" },
  {
    value: "postalCode",
    label: "우편번호",
    flex: "flex-[2]",
  },
  { value: "phone", label: "받는 분 전화번호", flex: "flex-[3]" },
  { value: "deliveryStatus", label: "상태", flex: "flex-[2] flex-center" },
  { value: "pdfUrl", label: "PDF", flex: "flex-[2] flex-center" },
  { value: "checkbox", label: "관리", flex: "flex-[1] flex-center" },
];

export const INSTITUTIONS_TABLE_ITEMS = [
  { value: "index", label: "번호", flex: "flex-[1]" },
  { value: "name", label: "기관 이름", flex: "flex-[3]" },
  { value: "code", label: "기관 코드", flex: "flex-[2]" },
  { value: "currentMembers", label: "당월 인원", flex: "flex-[2]" },
  { value: "nextMembers", label: "익월 인원", flex: "flex-[2]" },
  { value: "address", label: "기관 주소", flex: "flex-[6]" },
  { value: "postalCode", label: "우편번호", flex: "flex-[2]" },
  { value: "phone", label: "기관 전화번호", flex: "flex-[3]" },
  { value: "deliveryStatus", label: "상태", flex: "flex-[2] flex-center" },
  { value: "pdfUrl", label: "전체 PDF", flex: "flex-[2] flex-center" },
  { value: "checkbox", label: "관리", flex: "flex-[1] flex-center" },
];

export const ADD_INSTITUTIONS_TABLE_ITEMS = [
  { value: "index", label: "번호", flex: "flex-[1]" },
  { value: "name", label: "기관 이름", flex: "flex-[3]" },
  { value: "postalCode", label: "우편번호", flex: "flex-[3]" },
  { value: "address", label: "기관 주소", flex: "flex-[6]" },
  { value: "addressDetail", label: "상세 주소", flex: "flex-[2]" },
  { value: "phone", label: "기관 전화번호", flex: "flex-[4]" },
  { value: "serviceDate", label: "서비스 시작일", flex: "flex-[3]" },
  { value: "members", label: "인원", flex: "flex-[2]" },
  { value: "delete", label: "삭제", flex: "flex-[1]" },
];

export const INSTITUTIONS_DETAIL_TABLE_ITEMS = [
  { value: "index", label: "번호", flex: "flex-[1]" },
  { value: "receiverName", label: "성함", flex: "flex-[2]" },
  { value: "familyId", label: "가족 ID", flex: "flex-[2]" },
  { value: "addressDetail", label: "상세 주소", flex: "flex-[6]" },
  { value: "phone", label: "받는 분 전화번호", flex: "flex-[3]" },
  { value: "createdAt", label: "등록일", flex: "flex-[2]" },
  { value: "deliveryStatus", label: "상태", flex: "flex-[2] flex-center" },
  { value: "pdfUrl", label: "PDF", flex: "flex-[2] flex-center" },
];

export const INSTITUTION_FAMILY_TABLE_ITEMS = [
  { value: "index", label: "번호", flex: "flex-[1]" },
  { value: "receiverName", label: "성함", flex: "flex-[2]" },
  { value: "addressDetail", label: "상세 주소", flex: "flex-[2]" },
  { value: "phone", label: "받는 분 전화번호", flex: "flex-[2]" },
  { value: "createdAt", label: "최근 작성일", flex: "flex-[2]" },
  { value: "deliveryStatus", label: "상태", flex: "flex-[2] flex-center" },
  { value: "delete", label: "상세보기", flex: "flex-[1]" },
];
