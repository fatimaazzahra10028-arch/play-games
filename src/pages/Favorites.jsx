import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import GameCard from '../components/GameCard';

function Favorites() {
  const { state, removeFavorite } = useGameContext();
  const navigate = useNavigate();

  const handleClearAll = () => {
    state.favorites.forEach(game => {
      removeFavorite(game.id);
    });
  };

  if (state.favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => navigate('/games')}
            className="btn btn-ghost mb-8 hover:text-primary"
          >
            ← Back to Games
          </button>
          
          <div className="py-20">
            <div className="w-32 h-32 mx-auto mb-6">
              <svg
                className="w-full h-full text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">No Favorite Games Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't added any games to your favorites. Explore our collection and add your favorite games!
            </p>
            <button
              onClick={() => navigate('/games')}
              className="btn btn-primary btn-lg"
            >
              Explore Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="btn btn-ghost hover:text-primary"
          >
            ← Back to Games
          </button>
          
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">
              My Favorites ({state.favorites.length})
            </h1>
            {state.favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn btn-outline btn-error btn-sm"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;