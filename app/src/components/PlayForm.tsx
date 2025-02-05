import { useState } from "react";

interface PlayFormProps {
  onStartGame: (pseudo: string) => void;
}

function PlayForm({ onStartGame }: PlayFormProps) {
  const [pseudo, setPseudo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pseudo.trim()) {
      onStartGame(pseudo);
    }
  };

  return (
    <form className="join" onSubmit={handleSubmit}>
      <input
        className="input input-bordered join-item"
        placeholder="Ton pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />
      <button type="submit" className="btn btn-primary join-item rounded-r-full">
        Jouer une partie
      </button>
    </form>
  );
}

export default PlayForm;