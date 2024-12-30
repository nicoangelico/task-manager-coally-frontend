export const dateFormatMMDDYYYY = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString('en-US', options);
};