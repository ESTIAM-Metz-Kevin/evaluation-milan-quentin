import { useState } from "react";
import { NavLink } from "react-router";
import QuestionCard from "../components/QuestionCard";
import AnswerOption from "../components/AnswerOption";
import ScoreDisplay from "../components/ScoreDisplay";
import "./Game.css";

export default function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question: "Qui est le compositeur du thème principal de Tetris, Korobeïniki ?",
      difficulty: "Facile 🐤",
      options: [
        { text: "Piotr Tchaïkovski", correct: false },
        { text: "Nikolaï Nekrassov", correct: true },
        { text: "Alexandre Nikolaïevitch Skriabin", correct: false },
        { text: "Hirokazu Tanaka", correct: false },
      ],
    },
    // Ajouter plus de questions ici
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">
        Question <span className="badge badge-accent badge-lg">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </h2>
      
      {/* Affichage de la question */}
      <QuestionCard question={currentQuestion.question} difficulty={currentQuestion.difficulty} />
      
      <div className="grid grid-cols-2 gap-4 quizz--answers">
        {currentQuestion.options.map((option, index) => (
          <AnswerOption
            key={index}
            text={option.text}
            isCorrect={option.correct}
            onSelect={handleAnswer}
            answered={answered}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="btn btn-primary" onClick={nextQuestion} disabled={!answered}>
          Prochaine question
        </button>
      </div>

      {/* Affichage du score */}
      <ScoreDisplay score={score} total={questions.length} />

      {currentQuestionIndex === questions.length - 1 && (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <div>
            Fin du quizz ! Bonnes réponses :&nbsp;
            <span className="badge badge-primary badge-lg">{score} / {questions.length}</span>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => setCurrentQuestionIndex(0)}>Rejouer</button>
            <NavLink className="btn btn-secondary" to="/" end>
              Revenir à la page d'accueil
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
