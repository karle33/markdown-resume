/**
 * 切换选中文字两侧的主题色标记。
 * 已有完整标记时移除，否则添加标记。
 */
export const toggleThemeText = (content, selectedText, open, close = open) => {
  const wrappedText = open + selectedText + close;
  const wrappedIndex = content.indexOf(wrappedText);

  if (wrappedIndex !== -1) {
    return (
      content.slice(0, wrappedIndex) +
      selectedText +
      content.slice(wrappedIndex + wrappedText.length)
    );
  }

  const selectedIndex = content.indexOf(selectedText);
  if (selectedIndex === -1) {
    return null;
  }

  return (
    content.slice(0, selectedIndex) +
    wrappedText +
    content.slice(selectedIndex + selectedText.length)
  );
};
