import { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";

function Games() {
  const { state } = useGameContext();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  // Reset page saat search / genre berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, genre]);

  // Filter games berdasarkan search + genre
  const filteredGames = state.games.filter((game) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      game.title.toLowerCase().includes(keyword) ||
      game.genre.toLowerCase().includes(keyword);

    const matchGenre =
      genre === "all" || game.genre.toLowerCase() === genre;

    return matchSearch && matchGenre;
  });

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const currentGames = filteredGames.slice(
    indexOfFirstGame,
    indexOfLastGame
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // Loading state
  if (state.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <span className="loading loading-spinner loading-lg mb-4"></span>
        <p className="text-gray-300">Loading game collection...</p>
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <p>Failed to load games. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">Game Collection</h1>
          <p className="text-gray-400">
            Discover the best free-to-play games
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl mb-12 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search games by title or genre..."
                className="input input-bordered w-full pl-12 h-14 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Genre */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="select select-bordered h-14 bg-black/40 text-white w-full md:w-56"
            >
              <option value="all">All Genres</option>
              <option value="shooter">Shooter</option>
              <option value="mmorpg">MMORPG</option>
              <option value="rpg">RPG</option>
              <option value="strategy">Strategy</option>
            </select>

          </div>
        </div>

        {/* Game Grid */}
        {currentGames.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-semibold mb-2">No games found</h3>
            <p className="text-gray-400">
              Try a different keyword or genre
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="join">
              {/* Prev */}
              <button
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                > «
              </button>
             {/* Info Page */}
             <button className="join-item btn btn-disabled">
                Page {currentPage} of {totalPages}
              </button>
             {/* Next */}
              <button className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              > »
              </button>
            </div>
          </div>
          )}
        </>
         )}
      </div>
    </div>
  );
}

export default Games;
