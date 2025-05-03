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

export default function User() {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.error("Utilisateur non authentifié");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, [isAuthenticated]);

  const handleEdit = (id) => {
    console.log("Modifier l'utilisateur avec l'ID :", id);
  };

  const handleDelete = (id) => {
    console.log("Supprimer l'utilisateur avec l'ID :", id);
  };

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  return (
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
            <TableCell className="text-right">{user.role}</TableCell>
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
  );
}