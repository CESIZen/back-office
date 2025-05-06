const apiUrl = import.meta.env.VITE_API_URL;

class EmotionType {
  id: number;
  name: string;
  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

export const getAllEmotionTypes = async (): Promise<EmotionType[]> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotion_types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des types d'émotions");
  }

  return response.json();
};

export const createEmotionType = async (name: string, color: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotion_types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, color }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création du type d'émotion");
  }

  return response.json();
};

export const updateEmotionType = async (id: number, name: string, color: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotion_types/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, color }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la mise à jour du type d'émotion");
  }
};

export const deleteEmotionType = async (id: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotion_types/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la suppression du type d'émotion");
  }
};

export const getEmotionTypeById = async (id: number): Promise<EmotionType> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotion_types/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la récupération du type d'émotion");
  }

  return response.json();
};