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

export const updateUser = async (id: number, name: string, email: string, password?: string, roleId?: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const body: { name: string; email: string; password?: string; roleId?: number } = { name, email };
  if (password) body.password = password;
  if (roleId) body.roleId = roleId;

  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
};

export const getUserById = async (id: number): Promise<User> => {
  console.log("Appel de l'API pour l'utilisateur avec ID :", id);
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Réponse brute de l'API :", response);

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }

  const user = await response.json();
  console.log("Données utilisateur retournées :", user);
  return user;
};