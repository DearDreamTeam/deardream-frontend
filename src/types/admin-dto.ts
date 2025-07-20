export interface AdminCommonDto {
  name: string;
  address: string;
  postalCode: string;
  phone: string;
  deliveryStatus: string;
  pdfUrl: string;
}

export interface IndividualsDto extends AdminCommonDto {
  addressDetail: string;
  archiveId: number;
}

export interface InstitutionsDto extends AdminCommonDto {
  code: string; // 기관 코드
  currentMembers: number; //당월 인원
  nextMembers: number; //익월 인원
  institutionId: number;
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
