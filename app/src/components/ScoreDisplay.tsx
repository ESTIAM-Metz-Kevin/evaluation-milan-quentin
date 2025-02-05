interface ScoreDisplayProps {
    score: number;
    total: number;
  }
  
  const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
    return (
      <div className="text-center mt-4">
        <h4 className="font-bold">Ton score :</h4>
        <span className="badge badge-primary badge-lg">{score} / {total}</span>
      </div>
    );
  };
  
  export default ScoreDisplay;
  