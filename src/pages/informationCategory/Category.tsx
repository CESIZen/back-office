import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllCategories, deleteCategory } from "@/services/CategoryService";
import { Pencil, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    navigate("/create-category");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-category/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await deleteCategory(id);
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        console.log("Catégorie supprimée avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreateCategory} className="mb-5">
        <Plus /> Créer une catégorie
      </Button>
      <Table>
        <TableCaption>Liste des catégories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead className="w-[150px] text-center">Couleur</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-center">
                <Badge style={{ backgroundColor: category.color, color: "#fff" }}>
                  {category.color}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(category.id)}>
                  <Pencil />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(category.id)}>
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