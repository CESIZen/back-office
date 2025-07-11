import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/services/UserService";
import { getAllInformations } from "@/services/InformationService";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInformations, setTotalInformations] = useState(0);
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestInformations, setLatestInformations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        setTotalUsers(users.length);
        setLatestUsers(users.slice(-5).reverse());

        const informations = await getAllInformations();
        setTotalInformations(informations.length);
        setLatestInformations(informations.slice(-5).reverse());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total des informations interessante</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalInformations}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>5 derniers utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {latestUsers.map((user, index) => (
                <li key={index} className="text-lg">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>5 dernières informations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {latestInformations.map((info, index) => (
                <li key={index} className="text-lg">
                  {info.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>Voir plus de détails</Button>
      </div>
    </div>
  );
}