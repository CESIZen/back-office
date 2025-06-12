const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllCategories() {
  const response = await fetch(`${apiUrl}/categories`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des catégories");
  }
  return response.json();
}

export async function getCategoryById(id: number) {
  const response = await fetch(`${apiUrl}/categories/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la catégorie avec l'ID ${id}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error(`Réponse vide pour la catégorie avec l'ID ${id}`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Réponse non valide pour la catégorie avec l'ID ${id}`);
  }
}

export async function createCategory(name: string, color: string) {
  console.log("Données envoyées :", { name, color });
  const response = await fetch(`${apiUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, isActive: true, color }),
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Erreur serveur :", errorDetails);
    throw new Error("Erreur lors de la création de la catégorie");
  }
  return response.json();
}

export async function updateCategory(id: number, name: string, color: string) {
  const response = await fetch(`${apiUrl}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, isActive: true, color }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de la catégorie");
  }
  return response.json();
}

export async function deleteCategory(id: number) {
  const response = await fetch(`${apiUrl}/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la catégorie");
  }
  return response.json();
}