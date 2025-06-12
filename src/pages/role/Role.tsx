import React, { useEffect, useState } from "react";
import { getAllRoles, deleteRole } from "@/services/RoleService";
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
import { Pencil, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Role: React.FC = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRoles();
  }, []);

  const handleCreateRole = () => {
    navigate("/create-role");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-role/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rôle ?"  )) {
      try {
        await deleteRole(id);
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
        console.log("Rôle supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression du rôle :", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleCreateRole} className="mb-5">
        <Plus /> Créer un rôle
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table>
        <TableCaption>Liste des rôles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(role.id)}>
                  <Pencil />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(role.id)}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Role;