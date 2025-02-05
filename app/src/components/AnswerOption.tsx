interface AnswerOptionProps {
    text: string;
    isCorrect: boolean;
    onSelect: (isCorrect: boolean) => void;
    answered: boolean;
  }
  
  const AnswerOption = ({ text, isCorrect, onSelect, answered }: AnswerOptionProps) => {
    const handleClick = () => {
      if (!answered) {
        onSelect(isCorrect);
      }
    };
  
    return (
      <div
        className={`card bg-neutral text-neutral-content max-w-sm ${answered ? (isCorrect ? "bg-success" : "bg-error") : ""}`}
        onClick={handleClick}
      >
        <div className="card-body items-center text-center">
          {text}
        </div>
      </div>
    );
  };
  
  export default AnswerOption;
  