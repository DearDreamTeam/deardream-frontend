import { Area } from "react-easy-crop";

export const ASPECT_RATIO_ITEMS = [
  { label: "3:4", value: 3 / 4, class: "aspect-[3/4]" },
  { label: "4:3", value: 4 / 3, class: "aspect-[4/3]" },
];

export interface EditedProps {
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  croppedAreaPixels: Area;
}

export interface EditableImage {
  fileId?: number; // 삭제 구현용 아이디
  originalFile: File | null; // url로부터 수정 이미지를 생성하므로 그냥 파일 계속 업데이트
  originalUrl: string; // 원본 파일로부터 생성한 url
  previewUrl: string; // textarea 위에 display 용
  editedProps: null | EditedProps; // 재수정용 props 저장
}
