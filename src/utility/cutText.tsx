export const cutText = (text: string, limit: number): string | null => {
  if (!text) {
    return null;
  }

  if (text.length < limit) {
    return text;
  }

  const lastSpaceIndex: number = text.lastIndexOf(' ', limit);
  const sliced: string = text.slice(0, lastSpaceIndex);

  return `${sliced}...`;
};
