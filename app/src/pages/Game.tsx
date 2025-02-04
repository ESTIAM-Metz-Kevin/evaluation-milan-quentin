import { NavLink } from "react-router";
import "./Game.css";

export default function Game() {
  return (
    <>
      <h2 className="font-bold text-2xl mb-4">
        Question <span className="badge badge-accent badge-lg">1 / 10</span>
      </h2>
      <h3 className="font-bold mb-4">
        Qui est le compositeur du thème principal de Tetris, Korobeïniki ?
      </h3>

      <div className="badge badge-primary badge-lg mb-4">Facile 🐤</div>
      <div className="badge badge-primary badge-lg mb-4">Moyen 💪</div>
      <div className="badge badge-primary badge-lg mb-4">Difficile 💀</div>

      <div className="grid grid-cols-2 gap-4 quizz--answers">
        <div className="card bg-neutral text-neutral-content max-w-sm">
          <div className="card-body items-center text-center">
            Piotr Tchaïkovski
          </div>
        </div>
        <div className="card bg-success text-success-content max-w-sm">
          <div className="card-body items-center text-center">
            Nikolaï Nekrassov
          </div>
        </div>
        <div className="card bg-error text-error-content max-w-sm">
          <div className="card-body items-center text-center">
            Alexandre Nikolaïevitch Skriabin
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content max-w-sm">
          <div className="card-body items-center text-center">
            Hirokazu Tanaka
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="btn btn-primary">Prochaine question</button>
      </div>

      <div className="flex flex-col gap-2 mt-8 justify-center items-center align-center">
        <div>
          Fin du quizz ! Bonnes réponses :&nbsp;
          <span className="badge badge-primary badge-lg">0 / 10</span>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary">Rejouer</button>
          <NavLink className="btn btn-secondary" to="/" end>
            Revenir à la page d'accueil
          </NavLink>
        </div>
      </div>
    </>
  );
}
