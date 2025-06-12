import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getEmotionById, updateEmotion } from "@/services/EmotionService";
import { getAllEmotionTypes } from "@/services/EmotionTypeService";

interface EmotionType {
  id: number;
  name: string;
}

export default function EditEmotion() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [emotionTypeId, setEmotionTypeId] = useState<number | null>(null);
  const [emotionTypes, setEmotionTypes] = useState<EmotionType[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotion = async () => {
      try {
        if (!id) {
          console.error("ID manquant dans l'URL");
          return;
        }
        const emotion = await getEmotionById(Number(id));
        setName(emotion.name || "");
        setColor(emotion.color || "");
        setEmotionTypeId(emotion.emotionTypeId || null);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'émotion :", err);
        setError((err as Error).message || "Erreur lors de la récupération de l'émotion");
      }
    };

    const fetchEmotionTypes = async () => {
      try {
        const types = await getAllEmotionTypes();
        setEmotionTypes(types);
      } catch (err) {
        console.error("Erreur lors de la récupération des types d'émotions :", err);
      }
    };

    fetchEmotion();
    fetchEmotionTypes();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!id || !emotionTypeId) {
        setError("Veuillez remplir tous les champs.");
        return;
      }
      await updateEmotion(Number(id), name, color, Number(emotionTypeId));
      navigate("/emotions");
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier une émotion</h1>
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
          Modifier
        </Button>
      </form>
    </div>
  );
}