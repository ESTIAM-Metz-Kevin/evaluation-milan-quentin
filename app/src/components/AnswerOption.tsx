interface AnswerOptionProps {
  text: string; // Texte de la réponse affichée sur le bouton
  isCorrect: boolean; // Indique si la réponse est correcte ou non
  onSelect: (isCorrect: boolean) => void; // Fonction de rappel appelée lorsqu'une réponse est sélectionnée
  answered: boolean; // Indique si une réponse a déjà été donnée pour cette question
}

// Définition du composant AnswerOption
const AnswerOption = ({ text, isCorrect, onSelect, answered }: AnswerOptionProps) => {
  // Fonction déclenchée lorsqu'on clique sur une réponse
  const handleClick = () => {
      if (!answered) { // Si l'utilisateur n'a pas encore répondu
          onSelect(isCorrect); // Appelle la fonction onSelect avec la valeur de isCorrect
      }
  };

  return (
      <div
          className={`
              card bg-neutral text-neutral-content max-w-sm 
              ${answered ? (isCorrect ? "bg-success" : "bg-red-400") : ""}
          `} // Gère la couleur si la réponse est correcte ou incorrecte
          onClick={handleClick} // Gère le clic sur la réponse
      >
          <div className="card-body items-center text-center">
              {text} {/* Affiche le texte de la réponse */}
          </div>
      </div>
  );
};

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default AnswerOption;
