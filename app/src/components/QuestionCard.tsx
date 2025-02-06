interface QuestionCardProps {
  question: string;   // La question à afficher (string)
  difficulty: string; // Le niveau de difficulté (string)
}

// Définition du composant QuestionCard, il reçoit `question` et `difficulty` en propos
const QuestionCard = ({ question, difficulty }: QuestionCardProps) => {
  return (
    <>
      {/* Affiche la question sous forme de titre */}
      <h3 className="font-bold mb-4">{question}</h3>
      
      {/* Affiche le niveau de difficulté sous forme de badge */}
      <div className="badge badge-primary badge-lg mb-4">{difficulty}</div>
    </>
  );
};

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default QuestionCard;
