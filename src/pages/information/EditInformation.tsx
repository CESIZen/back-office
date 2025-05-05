import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInformationById, updateInformation } from "@/services/InformationService";
import { getAllCategories } from "@/services/CategoryService";
import { uploadImage } from "@/services/UploadService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const information = await getInformationById(Number(id));
          setTitle(information.title);
          setContent(information.content);
          setImageUrl(information.imageUrl);

          setSelectedCategories(information.categories.map((cat: any) => cat.categoryId));
        }
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors du chargement des données");
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let uploadedImageUrl = imageUrl;

      if (file) {
        uploadedImageUrl = await uploadImage(file);
      }
      console.log(selectedCategories)
      if (id) {

        await updateInformation(Number(id), {
          title,
          content,
          imageUrl: uploadedImageUrl,
          categoryIds: selectedCategories,
          isActive: true,
        });
        navigate("/informations");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier une information</h1>
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
          {imageUrl && (
            <div className="mb-2">
              <img src={imageUrl} alt="Aperçu" className="max-w-full h-auto rounded-md" />
            </div>
          )}
          <Input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Catégories</label>
          <div className="space-y-2">
            {categories.map((category: any) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id}`}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Modifier
        </Button>
      </form>
    </div>
  );
};

export default EditInformation;