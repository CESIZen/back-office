const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiUrl}/uploads/image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Erreur lors de l'upload de l'image :", errorDetails);
    throw new Error("Erreur lors de l'upload de l'image");
  }

  const data = await response.json();
  return data.url;
}