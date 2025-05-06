const apiUrl = import.meta.env.VITE_API_URL;

class Emotion {
  id: number;
  name: string;
  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

export const getAllEmotions = async (): Promise<Emotion[]> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des émotions");
  }

  const data = await response.json();
  console.log("Données récupérées :", data);
  return data;
};
export const createEmotion = async (name: string, color: string, emotionTypeId: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, color, emotionTypeId }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création de l'émotion");
  }

  return response.json();
};

export const updateEmotion = async (id: number, name: string, color: string, emotionTypeId: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, color, emotionTypeId }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la mise à jour de l'émotion");
  }
};

export const deleteEmotion = async (id: number): Promise<void> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la suppression de l'émotion");
  }
};

export const getEmotionById = async (id: number): Promise<Emotion> => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${apiUrl}/emotions/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la récupération de l'émotion");
  }

  return response.json();
};

