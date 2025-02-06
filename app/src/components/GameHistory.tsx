interface GameHistoryProps {
  history?: { pseudo: string; score: string; date: string }[]; // Définition du type des données de l'historique
}

function GameHistory({ history = [] }: GameHistoryProps) { // Si aucun historique n'est passé, un tableau vide est utilisé
  return (
    <div className="overflow-x-auto mb-14"> {/* Conteneur avec défilement horizontal pour la table */}
      <table className="table"> {/* Table pour afficher l'historique des parties */}
        <thead>
          <tr>
            <th>Joueur</th> {/* Titre de la colonne pour le pseudo du joueur */}
            <th>Score</th>  {/* Titre de la colonne pour le score */}
            <th>Date</th>   {/* Titre de la colonne pour la date de la partie */}
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">Aucun historique</td> {/* Affichage d'un message indiquant qu'il n'y a pas de parties passées */}
            </tr>
          ) : (
            history.map((entry, index) => (
              <tr key={index}> {/* Chaque ligne doit avoir une clé unique */}
                <td>{entry.pseudo}</td> {/* Affichage du pseudo du joueur */}
                <td>{entry.score}</td>  {/* Affichage du score */}
                <td>{entry.date}</td>   {/* Affichage de la date de la partie */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GameHistory;  // Exportation du composant pour pouvoir l'utiliser dans d'autres fichiers
