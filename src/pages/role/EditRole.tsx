import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getRoleById, updateRole } from "@/services/RoleService";

export default function EditRole() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (!id) {
          console.error("ID manquant dans l'URL");
          return;
        }
        const role = await getRoleById(Number(id));
        console.log("Role récupéré :", role);
        if (role) {
          setName(role);
        } else {
          setError("Données du rôle introuvables");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du rôle :", err);
        setError((err as Error).message || "Erreur lors de la récupération du rôle");
      }
    };

    fetchRole();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!id) return;
      await updateRole(Number(id), name);
      navigate("/roles");
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier un rôle</h1>
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
        <Button type="submit" className="mt-4">
          Modifier
        </Button>
      </form>
    </div>
  );
}