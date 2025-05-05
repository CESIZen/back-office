import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInformations, deleteInformation } from "@/services/InformationService";
import { getCategoryById } from "@/services/CategoryService";

interface Information {
  id: number;
  title: string;
  content: string;
  categories: {
    id: number;
    name: string;
    color: string;
  }[];
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


export default function Information() {
  const [informations, setInformations] = useState<Information[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInformations = async () => {
      try {
        const data = await getAllInformations();

        const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Récupérer les détails des catégories
        const informationsWithCategories = await Promise.all(
          sortedData.map(async (info) => {
            const categories = await Promise.all(
              info.categories.map(async (category) => {
                const categoryDetails = await getCategoryById(category.categoryId);
                return categoryDetails;
              })
            );
            return { ...info, categories };
          })
        );

        setInformations(informationsWithCategories);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
      }
    };

    fetchInformations();
  }, []);

  const handleCreateInformation = () => {
    navigate("/create-informations");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-informations/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette information ?")) {
      try {
        await deleteInformation(id);
        setInformations((prevInformations) =>
          prevInformations.filter((info) => info.id !== id)
        );
        console.log("Information supprimée avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'information :", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreateInformation} className="mb-5">
        <Plus /> Ajouter une information
      </Button>
      <Table>
        <TableCaption>Liste des informations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Titre</TableHead>
            <TableHead>Contenu</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {informations.map((info) => (
            <TableRow key={info.id}>
              <TableCell className="font-medium">{info.title}</TableCell>
              <TableCell>{info.content}</TableCell>
              <TableCell>
                {info.categories && info.categories.length > 0 ? (
                  info.categories.map((category) => (
                    <Badge key={category.id} style={{ backgroundColor: category.color }}>
                      {category.name}
                    </Badge>
                  ))
                ) : (
                  "Aucune catégorie"
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(info.id)}>
                  <Pencil />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(info.id)}>
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