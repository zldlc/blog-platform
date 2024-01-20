export const getCurrentUserToken = (): string => {
  const loggedUserString = localStorage.getItem('loggedUser');
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  return loggedUser.user.token;
};
