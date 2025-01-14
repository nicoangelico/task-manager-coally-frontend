export const formatText = (text: string) => {
  if (text) {
    return `${text.charAt(0).toUpperCase() + text.slice(1)}`;
  }
  return '?';
};