import TextMessage from "@/public/icons/share-options/text-message.svg";
import KakaoTalk from "@/public/icons/share-options/kakaotalk.svg";
import Instagram from "@/public/icons/share-options/instagram.svg";
import Mail from "@/public/icons/share-options/mail.svg";
import Share from "@/public/icons/share-options/share.svg";
import { useUserStore } from "@/stores/useUserStore";

const tempAction = () => {};

const SHARE_DATA = {
  title: "이어드림 가족 초대",
  text: `${useUserStore.getState().user.name}님과 함께 소식지 만들기에 동참해보세요!`,
  url: "https://deardream-frontend.vercel.app/",
};

const SHARE_ACTIONS = {
  /* 문자 */
  handleShareSMS: () => {
    const smsLink = `sms:?body=${encodeURIComponent(`[${SHARE_DATA.title}] ${SHARE_DATA.text} ${SHARE_DATA.url}`)}`;
    window.location.href = smsLink;
  },

  /* 메일 */
  handleShareEmail: () => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(SHARE_DATA.title)}&body=${encodeURIComponent(`${SHARE_DATA.text} ${SHARE_DATA.url}`)}`;
    window.location.href = mailtoLink;
  },

  /* 더보기 */
  handleShareMore: () => {
    if (navigator.share) {
      navigator.share(SHARE_DATA);
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  },

  /* 카카오톡 kakao share sdk */
  handleShareKakao: () => {
    if (!window.Kakao) {
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: 121620,
      templateArgs: {
        hostName: `${useUserStore.getState().user.name}`,
        familyCount: `${2}`,
      },
    });
  },
};

export const SHARE_OPTION_ITEMS = [
  { icon: TextMessage, label: "문자", action: SHARE_ACTIONS.handleShareSMS },
  {
    icon: KakaoTalk,
    label: "카카오톡",
    action: SHARE_ACTIONS.handleShareKakao,
  },
  { icon: Instagram, label: "인스타그램", action: tempAction },
  { icon: Mail, label: "이메일", action: SHARE_ACTIONS.handleShareEmail },
  { icon: Share, label: "더보기", action: SHARE_ACTIONS.handleShareMore },
];
