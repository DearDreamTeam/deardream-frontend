export interface Families {
  familyId: number;
  archiveId: number; // 허용한 사람만 볼 수 있게..?
  receiverName: string;
  addressDetail: string;
  createdAt: string; // 기관 멤버로 등록일
  deliveryStatus: string;
  phone: string;
}

export interface OrganizationInfo {
  institutionId: number;
  institutionCode: string;
  institutionName: string;
  address: string;
  postalCode: string;
  phone: string;
  deliveryStatus: string;
}
