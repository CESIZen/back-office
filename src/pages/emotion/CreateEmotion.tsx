import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createEmotion } from "@/services/EmotionService";
import { getAllEmotionTypes } from "@/services/EmotionTypeService";

interface EmotionType {
  id: number;
  name: string;
}

export default function CreateEmotion() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [emotionTypeId, setEmotionTypeId] = useState<number | null>(null);
  const [emotionTypes, setEmotionTypes] = useState<EmotionType[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotionTypes = async () => {
      try {
        const types = await getAllEmotionTypes();
        setEmotionTypes(types);
      } catch (err) {
        console.error("Erreur lors de la récupération des types d'émotions :", err);
      }
    };

    fetchEmotionTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!emotionTypeId) {
        setError("Veuillez sélectionner un type d'émotion.");
        return;
      }
      await createEmotion(name, color, emotionTypeId);
      navigate("/emotions");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Créer une émotion</h1>
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
        <div>
          <label htmlFor="emotionType" className="block text-sm font-medium">
            Type d'émotion
          </label>
          <select
            id="emotionType"
            value={emotionTypeId || ""}
            onChange={(e) => setEmotionTypeId(Number(e.target.value))}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="" disabled>
              Sélectionnez un type
            </option>
            {emotionTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="mt-4">
          Créer
        </Button>
      </form>
    </div>
  );
}