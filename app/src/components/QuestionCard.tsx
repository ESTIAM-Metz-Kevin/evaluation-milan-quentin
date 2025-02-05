interface QuestionCardProps {
    question: string;
    difficulty: string;
  }
  
  const QuestionCard = ({ question, difficulty }: QuestionCardProps) => {
    return (
      <>
        <h3 className="font-bold mb-4">{question}</h3>
        <div className="badge badge-primary badge-lg mb-4">{difficulty}</div>
      </>
    );
  };
  
  export default QuestionCard;
  