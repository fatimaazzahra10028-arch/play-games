import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";

function Favorites() {
  const { state, removeFavorite } = useGameContext();
  const navigate = useNavigate();

  const handleClearAll = () => {
    state.favorites.forEach((game) => removeFavorite(game.id));
  };

  // EMPTY STATE
  if (state.favorites.length === 0) {
    return (
      <div className="min-h-screen pt-28 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <button
            onClick={() => navigate("/games")}
            className="btn btn-ghost mb-8"
          >
            ← Back to Games
          </button>

          <div className="py-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              No Favorite Games Yet
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
              You haven't added any games to your favorites yet.
            </p>
            <button
              onClick={() => navigate("/games")}
              className="btn btn-primary"
            >
              Explore Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-8
                        sm:flex-row sm:items-center sm:justify-between">

          <button
            onClick={() => navigate("/games")}
            className="btn btn-ghost w-fit"
          >
            ← Back to Games
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              My Favorites
              <span className="text-pink-500 ml-2">
                ({state.favorites.length})
              </span>
            </h1>

            <button
              onClick={handleClearAll}
              className="btn btn-outline btn-error btn-sm w-fit"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {state.favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Favorites;
