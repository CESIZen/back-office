const apiUrl = import.meta.env.VITE_UPLOAD_URL;

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  console.log('VITE_UPLOAD_URL =', import.meta.env.VITE_UPLOAD_URL);
  const response = await fetch(`${apiUrl}/image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => response.text());
    console.error("Erreur lors de l'upload de l'image :", errorDetails);
    throw new Error(`Erreur lors de l'upload de l'image: ${JSON.stringify(errorDetails)}`);
  }

  const data = await response.json();
  let imageUrl: string = data.url;

  if (!imageUrl.startsWith("http")) {
    imageUrl = `${apiUrl.replace(/\/$/, "")}/${imageUrl.replace(/^\/+/, "")}`;
  }

  return imageUrl;
}