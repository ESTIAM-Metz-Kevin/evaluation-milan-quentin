import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // Permet de récupérer l'état passé via la navigation
import { NavLink } from "react-router"; // Utilisé pour les liens de navigation internes
import QuestionCard from "../components/QuestionCard"; // Composant affichant la question
import AnswerOption from "../components/AnswerOption"; // Composant affichant une option de réponse
import ScoreDisplay from "../components/ScoreDisplay"; // Composant affichant le score final
import { fetchQuestions } from "../services/quizService"; // Fonction récupérant les questions depuis une API
import "./Game.css"; // Import du fichier CSS

export default function Game() {
  const { state } = useLocation(); // Récupération de l'état passé depuis la navigation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question en cours
  const [score, setScore] = useState(0); // Score du joueur
  const [answered, setAnswered] = useState(false); // Indique si une réponse a été donnée
  const [questions, setQuestions] = useState<any[]>([]); // Liste des questions récupérées
  const [loading, setLoading] = useState(true); // Indique si les questions sont en cours de chargement
  const [error, setError] = useState(false); // Indique si une erreur s'est produite
  const [pseudo] = useState(state?.pseudo || ""); // Récupération du pseudo transmis via la navigation

  // Effet pour charger les questions au montage du composant
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchQuestions(); // Récupération des questions depuis l'API
        if (data?.quizzes?.length > 0) {
          // Formatage des questions pour inclure les options sous un format exploitable
          const formattedQuestions = data.quizzes.map((q : any) => ({
            question: q.question,
            difficulty: q.difficulty,
            options: [
              { text: q.answer, correct: true }, // La bonne réponse
              ...q.badAnswers.map((answer: string) => ({ text: answer, correct: false })) // Les mauvaises réponses
            ]
          }));
          setQuestions(formattedQuestions); // Mise à jour de l'état avec les questions formatées
        } else {
          throw new Error("Aucune question reçue ou format incorrect.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setError(true); // Activation du mode erreur si le chargement échoue
      }
      setLoading(false); // Fin du chargement, qu'il ait réussi ou échoué
    };
    loadQuestions();
  }, []);

  // Effet pour sauvegarder le score dans l'historique à la fin du quiz
  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1 && answered) {
      const date = new Date().toLocaleString();
      const newEntry = { pseudo, score, date };
      const storedHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]"); // Récupération de l'historique existant
      const updatedHistory = [newEntry, ...storedHistory].slice(0, 5); // Mise à jour des 5 dernières entrées
      localStorage.setItem("gameHistory", JSON.stringify(updatedHistory)); // Sauvegarde dans le localStorage
    }
  }, [answered, currentQuestionIndex, pseudo, score, questions.length]);

  // Fonction appelée lorsqu'une réponse est sélectionnée
  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return; // Empêche de cliquer plusieurs fois sur une réponse
    setAnswered(true); // Marque la question comme répondue
    if (isCorrect) setScore(score + 1); // Incrémente le score si la réponse est correcte
  };

  // Fonction pour passer à la question suivante
  const nextQuestion = () => {
    setAnswered(false); // Réinitialise l'état "répondu"
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Passe à la prochaine question
    }
  };

  // Affichage en fonction de l'état de chargement ou d'erreur
  if (loading) return <h2 className="text-center">Chargement des questions...</h2>;
  if (error || questions.length === 0) return <h2 className="text-center text-red-500">Erreur lors du chargement des questions.</h2>;

  const currentQuestion = questions[currentQuestionIndex]; // Récupération de la question en cours

  return (
    <>
      {/* Affichage du numéro de la question */}
      <h2 className="font-bold text-2xl mb-4">
        Question <span className="badge badge-accent badge-lg">{currentQuestionIndex + 1} / {questions.length}</span>
      </h2>

      {/* Composant affichant la question */}
      <QuestionCard question={currentQuestion.question} difficulty={currentQuestion.difficulty} />

      {/* Liste des réponses possibles */}
      <div className="grid grid-cols-2 gap-4 quizz--answers">
        {currentQuestion.options.map((option: { text: string; correct: boolean }, index: number) => (
          <AnswerOption
            key={index}
            text={option.text}
            isCorrect={option.correct}
            onSelect={handleAnswer}
            answered={answered}
          />
        ))}
      </div>

      {/* Bouton pour passer à la question suivante */}
      <div className="flex justify-center mt-8">
        <button className="btn btn-primary" onClick={nextQuestion} disabled={!answered || currentQuestionIndex === questions.length - 1}>
          Prochaine question
        </button>
      </div>

      {/* Affichage du score actuel */}
      <ScoreDisplay score={score} total={questions.length} />

      {/* Affichage du score final et options de fin de quiz */}
      {currentQuestionIndex === questions.length - 1 && answered && (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <div>
            Fin du quizz ! Bonnes réponses : <span className="badge badge-primary badge-lg">{score} / {questions.length}</span>
          </div>
          <div className="flex gap-2">
            {/* Bouton pour rejouer le quiz */}
            <button className="btn btn-primary" onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setAnswered(false);
            }}>
              Rejouer
            </button>
            {/* Lien pour retourner à la page d'accueil */}
            <NavLink className="btn btn-secondary" to="/" end>
              Revenir à la page d'accueil
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
