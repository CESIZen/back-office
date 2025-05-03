import {User} from "@/context/AuthContext.tsx";

export const getAllUsers = async (): Promise<User[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  if (!response.ok) {
    if (response.status === 401) {
      console.error("Erreur 401 : Non autorisé. Vérifiez votre token.");
    }
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }

  return response.json();
};