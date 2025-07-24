//Recupero il token dal localStorage
export function getToken() {
  return localStorage.getItem("token");
}

//Decodifico il token
export function decodeToken(token) {
  if (!token) return null;
  const payload = token.split(".")[1];
  try {
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

//Verifico che l'utente autenticato abbia il ruolo ADMIN
export function isAdminAuthenticated() {
  const token = getToken();
  const decoded = decodeToken(token);
  return decoded?.authorities?.includes("ADMIN");
}
