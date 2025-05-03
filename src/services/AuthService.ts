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
  if (!text) {
    throw new Error("Réponse vide de l'API");
  }

  return JSON.parse(text);
};