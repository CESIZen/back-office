import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmotions, deleteEmotion } from "@/services/EmotionService";

interface Emotion {
  id: number;
  name: string;
  color: string;
  emotionType: {
    id: number;
    name: string;
  };
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Trash } from "lucide-react";
import {getAllEmotionTypes} from "@/services/EmotionTypeService.ts";

export default function Emotion() {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const [emotions, emotionTypes] = await Promise.all([
          getAllEmotions(),
          getAllEmotionTypes(),
        ]);

        const enrichedEmotions = emotions.map((emotion) => {
          const emotionType = emotionTypes.find(
            (type) => type.id === emotion.emotionTypeId
          );
          return { ...emotion, emotionType };
        });

        setEmotions(enrichedEmotions);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchEmotions();
  }, []);

  const handleCreateEmotion = () => {
    navigate("/create-emotions");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-emotions/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette émotion ?")) {
      try {
        await deleteEmotion(Number(id));
        setEmotions((prevEmotions) =>
          prevEmotions.filter((emotion) => emotion.id !== id)
        );
        console.log("Émotion supprimée avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'émotion :", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreateEmotion} className="mb-5">
        <Plus /> Ajouter une émotion
      </Button>
      <Table>
        <TableCaption>Liste des émotions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Couleur</TableHead>
            <TableHead>Type d'émotion</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emotions.map((emotion) => (
            <TableRow key={emotion.id}>
              <TableCell className="font-medium">{emotion.name}</TableCell>
              <TableCell>
                <Badge style={{ backgroundColor: emotion.color }}>
                  {emotion.color}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge style={{ backgroundColor: emotion.emotionType?.color || "#ccc" }}>
                  {emotion.emotionType?.name || "Non défini"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(emotion.id)}>
                  <Pencil />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(emotion.id)}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}