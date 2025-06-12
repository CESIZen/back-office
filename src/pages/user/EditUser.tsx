import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getUserById, updateUser } from "@/services/UserService";
import { getAllRoles } from "@/services/RoleService";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | "">("");
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          console.error("ID manquant dans l'URL");
          return;
        }
        const user = await getUserById(Number(id));
        if (user) {
          setName(user.name || "");
          setEmail(user.email || "");
          setRoleId(user.roleId || "");
        } else {
          console.error("Aucun utilisateur trouvé");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        setError((err as Error).message || "Erreur lors de la récupération de l'utilisateur");
      }
    };

    const fetchRoles = async () => {
      try {
        const rolesData = await getAllRoles();
        setRoles(rolesData);
      } catch (err) {
        console.error("Erreur lors de la récupération des rôles :", err);
        setRoles([]);
      }
    };

    fetchUser();
    fetchRoles();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!id) return;
      await updateUser(Number(id), name, email, password || undefined, roleId ? Number(roleId) : undefined);
      navigate("/users");
    } catch (err) {
      setError((err as Error).message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier un utilisateur</h1>
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
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Mot de passe (laisser vide pour ne pas modifier)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Rôle
          </label>
          <select
            id="role"
            value={roleId}
            onChange={(e) => setRoleId(Number(e.target.value))}
            className="w-full border rounded-md p-2"
            required
          >
            {roleId === "" && (
              <option value="" disabled>
                Sélectionnez un rôle
              </option>
            )}
            {Array.isArray(roles) && roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
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