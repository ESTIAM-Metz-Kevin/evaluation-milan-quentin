interface GameHistoryProps {
    // A RECUPRER DEPUIS L'API
    history?: { pseudo: string, score: string, date: string }[];
  }
  
  function GameHistory({ history = [] }: GameHistoryProps) {
    return (
      <div className="overflow-x-auto mb-14">
        <table className="table">
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">Aucun historique</td>
              </tr>
            ) : (
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
  
  export default GameHistory;
  