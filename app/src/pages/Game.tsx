import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router";
import QuestionCard from "../components/QuestionCard";
import AnswerOption from "../components/AnswerOption";
import ScoreDisplay from "../components/ScoreDisplay";
import { fetchQuestions } from "../services/quizService";
import "./Game.css";

export default function Game() {
  const { state } = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pseudo] = useState(state?.pseudo || "");

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchQuestions();
        if (data?.quizzes?.length > 0) {
          const formattedQuestions = data.quizzes.map((q: any) => ({
            question: q.question,
            difficulty: q.difficulty,
            options: [
              { text: q.answer, correct: true },
              ...q.badAnswers.map((answer: string) => ({ text: answer, correct: false }))
            ]
          }));
          setQuestions(formattedQuestions);
        } else {
          throw new Error("Aucune question reçue ou format incorrect.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setError(true);
      }
      setLoading(false);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1 && answered) {
      const date = new Date().toLocaleString();
      const newEntry = { pseudo, score, date };
      const storedHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]");
      const updatedHistory = [newEntry, ...storedHistory].slice(0, 5);
      localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
    }
  }, [answered, currentQuestionIndex, pseudo, score, questions.length]);

  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return;
    setAnswered(true);
    if (isCorrect) setScore(score + 1);
  };

  const nextQuestion = () => {
    setAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (loading) return <h2 className="text-center">Chargement des questions...</h2>;
  if (error || questions.length === 0) return <h2 className="text-center text-red-500">Erreur lors du chargement des questions.</h2>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">
        Question <span className="badge badge-accent badge-lg">{currentQuestionIndex + 1} / {questions.length}</span>
      </h2>
      <QuestionCard question={currentQuestion.question} difficulty={currentQuestion.difficulty} />
      <div className="grid grid-cols-2 gap-4 quizz--answers">
      {currentQuestion.options.map((option: { text: string; correct: boolean }, index: number) => (

          <AnswerOption key={index} text={option.text} isCorrect={option.correct} onSelect={handleAnswer} answered={answered} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="btn btn-primary" onClick={nextQuestion} disabled={!answered || currentQuestionIndex === questions.length - 1}>
          Prochaine question
        </button>
      </div>
      <ScoreDisplay score={score} total={questions.length} />
      {currentQuestionIndex === questions.length - 1 && answered && (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <div>
            Fin du quizz ! Bonnes réponses : <span className="badge badge-primary badge-lg">{score} / {questions.length}</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setAnswered(false);
            }}>
              Rejouer
            </button>
            <NavLink className="btn btn-secondary" to="/" end>Revenir à la page d'accueil</NavLink>
          </div>
        </div>
      )}
    </>
  );
}
