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
  console.log(role)
  return role.name;
}