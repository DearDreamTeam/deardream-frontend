export interface Families {
  familyId: number;
  archiveId: number;
  receiverName: string;
  addressDetail: string;
  createdAt: string;
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
