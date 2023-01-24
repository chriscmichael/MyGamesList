import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import imagenotavail from "/app/src/images/imagenotavail.jpg";

function AllGamesList() {
  const [games, setgames] = useState([]);
  const [limit, setLimit] = useState([]);
  const [offset, setOffset] = useState([]);
  const [noimage, setNoImage] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getGameData = async () => {
    // const gamesUrl = 'http://localhost:8000/api/games/'
    // const fetchConfig = {query:{"limit": limit, "offset": offset}}
    window.scrollTo(0, 0);
    const response = await fetch("http://localhost:8000/games/");
    const gameData = await response.json();

    setgames(gameData.games);
    setNoImage(imagenotavail);
    setRefresh(false);
  };

  useEffect(() => {
    getGameData();
  }, [noimage]);

  return (
    <div>
      <h1>All Games</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Game Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games?.map((game) => {
            return (
              <tr key={game.id}>
                <Link to={`/games/${game.id}`} onClick={() => setRefresh(true)}>
                  <h3>{game.name}</h3>
                </Link>
                <td>
                  <img
                    src={
                      game.cover === "cover not found" ? noimage : game.cover
                    }
                    className="img-fluid"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllGamesList;
