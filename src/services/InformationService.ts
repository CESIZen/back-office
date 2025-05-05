const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllInformations() {
  const response = await fetch(`${apiUrl}/informations`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des informations");
  }
  return response.json();
}

export async function getInformationById(id: number) {
  const response = await fetch(`${apiUrl}/informations/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'information");
  }
  return response.json();
}

export async function createInformation(data: {
  title: string;
  content: string;
  imageUrl: string;
  userId: number;
  isActive: boolean;
}) {
  const response = await fetch(`${apiUrl}/informations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création de l'information");
  }

  return response.json();
}

export async function updateInformation(id: number, data: {
  title: string;
  content: string;
  imageUrl?: string;
  categories: number[];
  isActive: boolean;
}) {
  const response = await fetch(`${apiUrl}/informations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la mise à jour de l'information");
  }

  return response.json();
}

export async function deleteInformation(id: number) {
  const response = await fetch(`${apiUrl}/informations/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'information");
  }
  return response.json();
}