interface ScoreDisplayProps {
  score: number; // Le score actuel du joueur (entier)
  total: number; // Le nb de questions totales possible (entier)
}

// Définition du composant ScoreDisplay, il reçoit `score` et `total` en propos
const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
  return (
    <div className="text-center mt-4">
      {/* Titre indiquant que la section concerne le score */}
      <h4 className="font-bold">Ton score :</h4>

      {/* Affichage du score sous forme de badge */}
      <span className="badge badge-primary badge-lg">{score} / {total}</span>
    </div>
  );
};

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default ScoreDisplay;
