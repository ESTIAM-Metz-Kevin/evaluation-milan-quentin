import { useNavigate } from "react-router";
import PlayForm from "../components/PlayForm.tsx";
import GameHistory from "../components/GameHistory.tsx";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>
      
      <GameHistory />

      <PlayForm onStartGame={(pseudo: string) => navigate(`/game`, { state: { pseudo } })} />
    </div>
  );
}

export default Home;
