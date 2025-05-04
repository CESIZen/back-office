import {EnumRole, Role} from "@/types/Role.ts";

export const getRoleById = async (id: number): Promise<EnumRole> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/roles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Rôle non trouvé");
    }
    throw new Error("Erreur lors de la récupération du rôle");
  }

  const role: Role = await response.json();
  console.log("role.name", role.name); // Debug
  return role.name;
}

export const getAllRoles = async (): Promise<Role[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des rôles");
  }

  return response.json();
};

export const createRole = async (name: string): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création du rôle");
  }
};

export const updateRole = async (id: number, name: string): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/roles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la mise à jour du rôle");
  }
};

export const deleteRole = async (id: number): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }
  const response = await fetch(`${apiUrl}/roles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la suppression du rôle");
  }
  console.log("Rôle supprimé avec succès");
  return response.json();
}