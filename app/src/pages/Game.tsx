import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink, useNavigate } from "react-router";
import QuestionCard from "../components/QuestionCard";
import AnswerOption from "../components/AnswerOption";
import ScoreDisplay from "../components/ScoreDisplay";
import "./Game.css";

// Définition du composant Game
export default function Game() {
  const { state } = useLocation(); // Récupérer le `state` contenant le pseudo

  // Suivi de l'index de la question actuelle
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Suivi du score du joueur
  const [score, setScore] = useState(0);
  
  // Suivi de l'état de réponse (si la question a été répondue)
  const [answered, setAnswered] = useState(false);

  // Historique des parties
  const [history, setHistory] = useState<{ pseudo: string; score: number; date: string }[]>([]);
  
  // Pseudo du joueur
  const [pseudo, setPseudo] = useState(state?.pseudo || ""); // Récupérez le pseudo ou une valeur par défaut si non défini
  
  // Utilisation du hook useNavigate pour naviguer entre les pages
  const navigate = useNavigate();
  
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
    // Empêche de changer la réponse après sélection
    if (answered) return; 
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

  // Sauvegarder l'historique localement à chaque fin de quiz
 useEffect(() => {
  if (currentQuestionIndex === questions.length - 1 && answered) {
    const date = new Date().toLocaleString(); // Récupère la date actuelle
    const newHistory = [...history, { pseudo, score, date }]; // Ajoute l'entrée dans l'historique
    setHistory(newHistory);
    localStorage.setItem("gameHistory", JSON.stringify(newHistory)); // Sauvegarde dans le localStorage
  }
}, [answered, currentQuestionIndex, pseudo]); // Inclure `pseudo` dans les dépendances pour s'assurer qu'il est mis à jour correctement

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
                setScore(0); // Reset le score à 0
                setCurrentQuestionIndex(0); // Remet la première question
                setAnswered(false); // Réinitialise l'état de réponse
                setPseudo(""); // Reset le pseudo
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
