import { User } from "@/types/User";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }

  return response.json();
};

export const createUser = async (name: string, email: string, password: string , roleId: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password, roleId }),
  });
  console.log(response)
  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création de l'utilisateur");
  }
};