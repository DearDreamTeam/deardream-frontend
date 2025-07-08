export const ASPECT_RATIO_ITEMS = [
  { label: "3:4", value: 3 / 4, class: "aspect-[3/4]" },
  { label: "4:3", value: 4 / 3, class: "aspect-[4/3]" },
];

export interface EditedProps {
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
}

export interface EditableImage {
  fileId: number; // 삭제 구현용 아이디
  originalFile: File | null; // editedProps가 null이면 back으로 보냄
  originalUrl: string; // 원본 파일로부터 생성한 url
  previewUrl: string; // textarea 위에 display 용
  editedProps: null | EditedProps;
}
