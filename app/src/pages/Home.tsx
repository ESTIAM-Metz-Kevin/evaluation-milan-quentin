import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>

      <div className="overflow-x-auto mb-14">
        {/* Le contenu est un exemple, les datas doivent venir de l'API qui de classement */}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Mario Bros</th>
              <td>6/10</td>
              <td>03/02/2025 à 16h30</td>
            </tr>
            <tr>
              <th>Sarah Pixel</th>
              <td>8/10</td>
              <td>03/02/2025 à 14h22</td>
            </tr>
            <tr>
              <th>John Doe</th>
              <td>5/10</td>
              <td>03/02/2025 à 13h45</td>
            </tr>
          </tbody>
        </table>
      </div>

      <form
        className="join"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/game");
        }}
      >
        <input
          className="input input-bordered join-item"
          placeholder="Ton pseudo"
        />
        <button className="btn btn-primary join-item rounded-r-full">
          Jouer une partie
        </button>
      </form>
    </div>
  );
}

export default Home;
