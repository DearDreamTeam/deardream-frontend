const POST_TEXT_LIMIT = {
  WITH_IMAGE: 200,
  WITHOUT_IMAGE: 600,
};

export function getTextLimitByImageCount(imageCount: number): number {
  return imageCount > 0
    ? POST_TEXT_LIMIT.WITH_IMAGE
    : POST_TEXT_LIMIT.WITHOUT_IMAGE;
}

export function isContentValid(content: string, imageCount: number): boolean {
  if (content.trim().length === 0 && imageCount === 0) {
    return false;
  }

  /**
   * 이미지 X - 600자 이하
   * 이미지 O - 200자 이하
   */
  const contentLength = content.length;
  if (
    (imageCount === 0 && contentLength <= POST_TEXT_LIMIT.WITHOUT_IMAGE) ||
    (imageCount <= 2 && contentLength <= POST_TEXT_LIMIT.WITH_IMAGE)
  ) {
    return true;
  }
  return false;
}
