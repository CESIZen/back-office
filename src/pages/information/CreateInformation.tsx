import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createInformation } from "@/services/InformationService";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/services/UploadService.ts";
import { getUserIdFromToken } from "@/services/AuthService";
import { Input } from "@/components/ui/input.tsx";
import { getAllCategories } from "@/services/CategoryService";

const CreateInformation: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<number[]>([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAvailableCategories(categories);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      await createInformation({
        title,
        content,
        imageUrl,
        userId,
        categoryIds: categories,
        isActive: true  ,
      });

      navigate("/informations");
    } catch (err: any) {
      setError(err.response?.data?.message?.join(", ") || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Créer une information</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Contenu
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium">
            Image
          </label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Catégories</label>
          <div className="space-y-2">
            {availableCategories.map((category: { id: number; name: string }) => (
              <div key={category.id}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={category.id}
                    checked={categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Créer
        </Button>
      </form>
    </div>
  );
};

export default CreateInformation;