export const TOKEN_KEY = "gerencia-es.permission";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const signin = async token => {
  await localStorage.setItem(TOKEN_KEY, token);
  window.location = "/";
};
export const logout = async () => {
  await localStorage.removeItem(TOKEN_KEY);
  window.location = "/signin";
};
