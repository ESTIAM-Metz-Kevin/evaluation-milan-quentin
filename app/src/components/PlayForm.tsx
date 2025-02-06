import { useState } from "react"; // Importation de useState pour gérer l'état local

interface PlayFormProps {
  onStartGame: (pseudo: string) => void; // Fonction déclenchée au début du jeu, recevant un pseudo
}

// Définition du composant PlayForm
function PlayForm({ onStartGame }: PlayFormProps) {
  // Déclaration d'un état local pour stocker le pseudo saisi par l'utilisateur
  const [pseudo, setPseudo] = useState("");

  // Fonction déclenchée lors de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (pseudo.trim()) { // Vérifie que le pseudo n'est pas vide après suppression des espaces
      onStartGame(pseudo); // Appelle la fonction onStartGame avec le pseudo
    }
  };

  return (
    <form className="join" onSubmit={handleSubmit}>
      {/* Champ de saisie du pseudo */}
      <input
        className="input input-bordered join-item"
        placeholder="Ton pseudo"
        value={pseudo} // L'état est lié à l'input
        onChange={(e) => setPseudo(e.target.value)} // Met à jour l'état à chaque saisie
      />
      {/* Bouton pour démarrer la partie */}
      <button type="submit" className="btn btn-primary join-item rounded-r-full">
        Jouer une partie
      </button>
    </form>
  );
}

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default PlayForm;
