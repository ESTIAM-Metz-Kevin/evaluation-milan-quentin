import { useNavigate } from "react-router";
import PlayForm from "../components/PlayForm.tsx"; // Import du composant de formulaire
import GameHistory from "../components/GameHistory.tsx"; // Import du composant d'historique des parties

// Définition du composant Home, qui représente la page d'accueil du jeu
function Home() {
  const navigate = useNavigate(); // Hook de React Router pour la navigation

  return (
    <div>
      {/* Titre de la section historique */}
      <h2 className="font-bold">Historique des parties</h2>
      
      {/* Affichage de l'historique des parties */}
      <GameHistory />

      {/* Formulaire pour entrer un pseudo et démarrer une partie */}
      <PlayForm 
        onStartGame={(pseudo: string) => 
          navigate(`/game`, { state: { pseudo } }) // Redirige vers la page de jeu avec le pseudo
        } 
      />
    </div>
  );
}

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default Home;
