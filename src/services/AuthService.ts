import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  sub: number;
  name: string;
  email: string;
  roleId: number;
}

export const login = async (credentials: { email: string; password: string }) => {
  console.log("Données envoyées :", credentials);
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  console.log("response", response);
  if (!response.ok) {
    throw new Error("Erreur lors de la connexion");
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Réponse vide de l'API");
  }

  return JSON.parse(text);
};

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};
