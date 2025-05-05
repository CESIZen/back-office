import React, { useState } from 'react';
import {Input} from "@/components/ui/input.tsx";

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null); // URL de l'image uploadée

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
      } else {
        alert('Veuillez sélectionner un fichier image valide.');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Aucun fichier sélectionné.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      const data = await response.json();
      setUploadUrl(data.url); // Supposons que l'API retourne l'URL de l'image
      console.log('Image uploadée avec succès :', data);
    } catch (error) {
      console.error('Erreur lors de l\'upload :', error);
    }
  };

  return (
    <div>
      <Input id="file" type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Uploader</button>
      {uploadUrl && <p>Image uploadée : <a href={uploadUrl} target="_blank" rel="noopener noreferrer">{uploadUrl}</a></p>}
    </div>
  );
};

export default UploadImage;