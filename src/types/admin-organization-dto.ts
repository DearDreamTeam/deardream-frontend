export interface Families {
  archiveId: number;
  familyId: number;
  receiverName: string;
  addressDetail: string;
  deliveryStatus: string;
  pdfUrl: string;

  phone: string;
  createdAt: string;
}

export interface OrganizationFamilies {
  archiveId: number;
  familyId: number;
  receiverName: string;
  addressDetail: string;
  deliveryStatus: string;

  phone: string;
  createdAt: string;
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
