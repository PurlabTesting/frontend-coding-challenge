export const daysInMonth = (
  year: number,
  month: number,
): number => new Date(year, month + 1, 0).getDate();

export const emptyDaysInMonth = (
  year: number,
  month: number,
): number => new Date(year, month, 1).getDay();
