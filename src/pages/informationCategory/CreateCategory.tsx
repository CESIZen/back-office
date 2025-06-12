import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/services/CategoryService";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createCategory(name, color);
      navigate("/categories");
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Créer une catégorie</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nom
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium">
            Couleur
          </label>
          <input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <Button type="submit" className="mt-4">
          Créer
        </Button>
      </form>
    </div>
  );
}