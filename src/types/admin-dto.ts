export interface AdminCommonDto {
  address: string;
  postalCode: string;
  phone: string;
  pdfUrl: string;
  deliveryStatus: string;
}

export interface IndividualsDto extends AdminCommonDto {
  receiverName: string;
  addressDetail: string;
  archiveId: number;
}

export interface InstitutionsDto extends AdminCommonDto {
  name: string;
  institutionId: number;
  code: string; // 기관 코드
  currentMembers: number; //당월 인원
  nextMembers: number; //익월 인원
  pdfUrl: string;
}

export interface AddInstitutionDto {
  name: string;
  address: string;
  phone: string;
  postalCode: string;
  serviceDate: string;
  members: number;
}

export interface AddInstitutionProps extends AddInstitutionDto {
  addressDetail: string;
}
