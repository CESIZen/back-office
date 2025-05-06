import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllEmotionTypes, deleteEmotionType } from "@/services/EmotionTypeService";
import { Pencil, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EmotionType() {
  const [emotionTypes, setEmotionTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotionTypes = async () => {
      try {
        const data = await getAllEmotionTypes();
        setEmotionTypes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types d'émotions :", error);
      }
    };

    fetchEmotionTypes();
  }, []);

  const handleCreateEmotionType = () => {
    navigate("/create-type-emotion");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-type-emotion/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce type d'émotion ?")) {
      try {
        await deleteEmotionType(id);
        setEmotionTypes((prev) => prev.filter((type) => type.id !== id));
        console.log("Type d'émotion supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression du type d'émotion :", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreateEmotionType} className="mb-5">
        <Plus /> Ajouter un type d'émotion
      </Button>
      <Table>
        <TableCaption>Liste des types d'émotions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead className="w-[150px] text-center">Couleur</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emotionTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell className="font-medium">{type.name}</TableCell>
              <TableCell className="text-center">
                <Badge style={{ backgroundColor: type.color, color: "#fff" }}>
                  {type.color}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(type.id)}>
                  <Pencil />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(type.id)}>
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