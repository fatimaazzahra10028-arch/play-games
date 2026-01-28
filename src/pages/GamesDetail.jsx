import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

function GamesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useGameContext();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/game?id=${id}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Game not found</p>
          <button
            onClick={() => navigate("/games")}
            className="btn btn-primary"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(game.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="btn btn-ghost mb-8">
          ← Back
        </button>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <img
              src={game.thumbnail}
              alt={game.title}
              className="rounded-2xl shadow-2xl w-full"
            />

            <div className="grid grid-cols-2 gap-4 mt-6">
              {game.screenshots?.slice(0, 2).map((shot, i) => (
                <img
                  key={i}
                  src={shot.image}
                  alt="Screenshot"
                  className="rounded-xl hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{game.title}</h1>

            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                Game Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => window.open(game.game_url, "_blank")}
                className="btn btn-primary flex-1"
              >
                🎮 Play Game
              </button>

              <button
                onClick={() =>
                  favorite
                    ? removeFavorite(game.id)
                    : addFavorite(game)
                }
                className={`btn flex-1 ${
                  favorite ? "btn-error" : "btn-outline"
                }`}
              >
                {favorite ? "❤️ Remove Favorite" : "🤍 Add to Favorite"}
              </button>
            </div>

            <p className="text-sm text-gray-400">
              Release Date: {game.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesDetail;
