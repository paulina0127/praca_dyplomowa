export const isAuthenticated = () => {
  const userTokens = localStorage.getItem("userTokens");

  if (userTokens) {
    return true;
  }
  return false;
};
