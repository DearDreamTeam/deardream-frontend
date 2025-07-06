export const NOTIFICATION_MESSAGES = {
  TEXT_LIMIT_INVALID: {
    WITH_IMAGES: {
      title: "큰 글자 인쇄를 위해 제한이 있어요",
      content:
        "가독성 높은 큰 글씨로 인쇄되도록\n200자 이상 글은 사진과 함께 올릴 수 없어요.\n글을 줄이거나 사진을 빼볼까요?",
    },
    WITHOUT_IMAGES: {
      title: "큰 글자 인쇄를 위해 제한이 있어요",
      content:
        "가독성 높은 큰 글씨로 인쇄되도록\n600자 이상의 글은 올릴 수 없어요\n글을 줄여볼까요?",
    },
  },

  WRITE_CANCEL_WARNING: {
    NEW: {
      title: "작성 취소 시 복구할 수 없어요",
      content: "저장하지 않은 내용은 사라져요\n그래도 취소하시겠어요?",
    },
    EDIT: {
      title: "수정 취소 시 복구할 수 없어요",
      content: "저장하지 않은 내용은 사라져요\n그래도 취소하시겠어요?",
    },
  },

  DELETE_POST: {
    title: "삭제 시 복구할 수 없어요",
    content: "한 번 삭제하면 다시 되돌릴 수 없어요\n그래도 삭제하시겠어요?",
  },

  CANNOT_ADD_MORE_IMAGES: {
    title: "사진 첨부가 제한돼요",
    content: "사진은 최대 2장까지만 선택할 수 있어요",
  },
};
