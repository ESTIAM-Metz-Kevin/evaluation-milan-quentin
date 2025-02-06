import { useEffect, useState } from "react";
import GameHistory from "../components/GameHistory"; // Assurez-vous que ce composant est correctement importé
import PlayForm from "../components/PlayForm";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<{ pseudo: string, score: string, date: string }[]>([]);

  // Charger l'historique depuis localStorage au démarrage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    // Limiter l'historique aux 5 dernières parties
    const latestHistory = storedHistory.slice(-5);
    setHistory(latestHistory);
  }, []);

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>
      {/* Passer l'historique des parties au composant GameHistory */}
      <GameHistory history={history} />

      {/* Formulaire de début de jeu */}
      <PlayForm onStartGame={(pseudo: string) => navigate(`/game`, { state: { pseudo } })} />
    </div>
  );
}

export default Home;
