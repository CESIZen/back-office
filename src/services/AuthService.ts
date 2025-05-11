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
  if (!text) throw new Error("Réponse vide de l'API");
  const data = JSON.parse(text);
  const decoded: any = jwtDecode(data.access_token);

  return {
    access_token: data.access_token,
    user: {
      name: decoded.name,
      email: decoded.email,
      password: "",
      roleId: decoded.roleId,
    }
  }
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

export const requestPasswordReset = async (email: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;

  const response = await fetch(`${apiUrl}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      resetUrl: `${baseUrl}/reset-password`
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la demande de réinitialisation");
  }

  return await response.json();
};

export const resetPassword = async (token: string, newPassword: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Erreur lors de la réinitialisation du mot de passe");
  }

  return await response.json();
};