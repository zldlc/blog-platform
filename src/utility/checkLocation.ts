export const checkLocation = (notSaveHistoryPage: string, location: string): string => {
  if (location === notSaveHistoryPage) {
    return '/';
  }

  if (location) {
    return location;
  }

  return '/';
};
