import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/services/UserService";
import { getRoleById } from "@/services/RoleService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Plus} from "lucide-react";

export default function User() {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.error("Utilisateur non authentifié");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);

        const rolePromises = data.map(async (user) => {
          const roleName: EnumRole = await getRoleById(user.roleId);
          return { id: user.roleId, name: roleName };
        });

        const resolvedRoles = await Promise.all(rolePromises);
        const roleMap = resolvedRoles.reduce((acc, role) => {
          acc[role.id] = role.name;
          return acc;
        }, {});
        setRoles(roleMap);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs ou des rôles :", error);
      }
    };

    fetchUsers();
  }, [isAuthenticated]);

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  const handleEdit = (id: number) => {
    console.log("Modifier l'utilisateur avec l'ID :", id);
  };

  const handleDelete = (id: number) => {
    console.log("Supprimer l'utilisateur avec l'ID :", id);
  };

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  return (
    <div>
      <Button
        onClick={handleCreateUser}
        className="mb-5"
      >
        <Plus /> Créer un utilisateur
      </Button>
      <Table>
        <TableCaption>Liste des utilisateurs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Rôle</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{roles[user.roleId] || "Chargement..."}</TableCell>
              <TableCell className="text-right">
                <button
                  className="mr-2 text-blue-500 hover:underline"
                  onClick={() => handleEdit(user.id)}
                >
                  Modifier
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}