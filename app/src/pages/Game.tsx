import { useState } from "react";
import { NavLink } from "react-router";
import QuestionCard from "../components/QuestionCard"; // Composant pour afficher une question
import AnswerOption from "../components/AnswerOption"; // Composant pour afficher une réponse
import ScoreDisplay from "../components/ScoreDisplay"; // Composant pour afficher le score
import "./Game.css"; // Importation du fichier CSS

// Définition du composant Game
export default function Game() {
  // Suivre la question en cours
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Stocker le score du joueur
  const [score, setScore] = useState(0);
  // Savoir si la question a été répondue
  const [answered, setAnswered] = useState(false);

  // Liste des questions (à remplacer par un appel API)
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
    {
      question: "Test",
      difficulty: "Facile 🐤",
      options: [
        { text: "1", correct: false },
        { text: "Bonne réponse", correct: true },
        { text: "3", correct: false },
        { text: "4", correct: false },
      ],
    },
  ];

  // Fonction déclenchée lorsqu'un utilisateur sélectionne une réponse
  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return; // Empêche de changer la réponse après sélection
    setAnswered(true); // Marque la question comme répondue
    if (isCorrect) {
      setScore(score + 1); // Augmente le score si la réponse est correcte
    }
  };

  // Fonction pour passer à la question suivante
  const nextQuestion = () => {
    setAnswered(false); // Réinitialise l'état de réponse
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Passe à la question suivante
    }
  };

  // Récupération de la question actuelle
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {/* Affichage du numéro de la question en cours */}
      <h2 className="font-bold text-2xl mb-4">
        Question <span className="badge badge-accent badge-lg">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </h2>
      
      {/* Affichage de la question */}
      <QuestionCard question={currentQuestion.question} difficulty={currentQuestion.difficulty} />
      
      {/* Affichage des options de réponse */}
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

      {/* Bouton pour passer à la prochaine question */}
      
      <div className="flex justify-center mt-8">
        <button 
          className="btn btn-primary" 
          onClick={nextQuestion} 
          disabled={!answered || currentQuestionIndex === questions.length - 1}
        >
          Prochaine question
        </button>
      </div>


      {/* Affichage du score actuel */}
      <ScoreDisplay score={score} total={questions.length} />

      {/* Affichage du message de fin de quiz si on a répondu à la dernière question */}
      {currentQuestionIndex === questions.length - 1 && answered && (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <div>
            Fin du quizz ! Bonnes réponses :&nbsp;
          <span className="badge badge-primary badge-lg">{score} / {questions.length}</span>
        </div>

        <div className="flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            setScore(0);
            setCurrentQuestionIndex(0); // Reset le score a 0 si on appuie sur rejouer
            setAnswered(false);
          }}
        >
          Rejouer
        </button> 
          <NavLink className="btn btn-secondary" to="/" end>
            Revenir à la page d'accueil
          </NavLink>
        </div>
      </div>
    )}

    </>
  );
}
