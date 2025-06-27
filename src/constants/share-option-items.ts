import TextMessage from "@/public/icons/share-options/text-message.svg";
import KakaoTalk from "@/public/icons/share-options/kakaotalk.svg";
import Instagram from "@/public/icons/share-options/instagram.svg";
import Mail from "@/public/icons/share-options/mail.svg";
import Share from "@/public/icons/share-options/share.svg";

const tempAction = () => {};

export const SHARE_OPTION_ITEMS = [
  { icon: TextMessage, label: "문자", action: tempAction },
  { icon: KakaoTalk, label: "카카오톡", action: tempAction },
  { icon: Instagram, label: "인스타그램", action: tempAction },
  { icon: Mail, label: "이메일", action: tempAction },
  { icon: Share, label: "더보기", action: tempAction },
];
