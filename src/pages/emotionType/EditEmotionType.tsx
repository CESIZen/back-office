import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getEmotionTypeById, updateEmotionType } from "@/services/EmotionTypeService";

export default function EditEmotionType() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotionType = async () => {
      try {
        if (!id) {
          console.error("ID manquant dans l'URL");
          return;
        }
        const emotionType = await getEmotionTypeById(Number(id));
        if (emotionType) {
          setName(emotionType.name || "");
          setColor(emotionType.color || "");
        } else {
          console.error("Aucun type d'émotion trouvé");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du type d'émotion :", err);
        setError((err as Error).message || "Erreur lors de la récupération du type d'émotion");
      }
    };

    fetchEmotionType();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!id) return;
      await updateEmotionType(Number(id),name, color);
      navigate("/type-emotion");
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier un type d'émotion</h1>
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
          Modifier
        </Button>
      </form>
    </div>
  );
}