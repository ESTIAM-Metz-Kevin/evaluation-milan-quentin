interface GameHistoryProps {
  // Données de l'historique récupérées depuis l'API
  history?: { 
      pseudo: string; // Nom du joueur
      score: string;  // Score obtenu
      date: string;   // Date de la partie
  }[];
}

// Définition du composant GameHistory
function GameHistory({ history = [] }: GameHistoryProps) {
  return (
      <div className="overflow-x-auto mb-14">
          {/* Tableau affichant l'historique des parties */}
          <table className="table">
              {/* En-tête du tableau */}
              <thead>
                  <tr>
                      <th>Joueur</th>
                      <th>Score</th>
                      <th>Date</th>
                  </tr>
              </thead>
              <tbody>
                  {/* Vérifie si l'historique est vide */}
                  {history.length === 0 ? (
                      // Affiche un message si aucun historique n'est disponible
                      <tr>
                          <td colSpan={3} className="text-center">
                              Aucun historique
                          </td>
                      </tr>
                  ) : (
                      // Génère dynamiquement les lignes du tableau à partir de l'historique
                      history.map((entry, index) => (
                          <tr key={index}>
                              <td>{entry.pseudo}</td>
                              <td>{entry.score}</td>
                              <td>{entry.date}</td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>
  );
}

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default GameHistory;
