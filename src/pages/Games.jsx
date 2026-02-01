import { useState, useEffect, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import { FiClock, FiX } from "react-icons/fi";

function Games() {
  const { state } = useGameContext();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  const searchRef = useRef(null);
  const gridRef = useRef(null); // 👈 GRID REF

  /* =====================
     LOAD HISTORY
  ===================== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(saved);
  }, []);

  /* =====================
     SAVE HISTORY
  ===================== */
  useEffect(() => {
    if (!search.trim()) return;

    const updated = [
      search,
      ...searchHistory.filter((item) => item !== search),
    ].slice(0, 5);

    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  }, [search]);

  /* =====================
     REMOVE SINGLE HISTORY
  ===================== */
  const removeHistory = (item) => {
    const updated = searchHistory.filter((h) => h !== item);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  /* =====================
     FILTER + AUTOCOMPLETE
  ===================== */
  const filteredHistory = searchHistory.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => setCurrentPage(1), [search, genre]);

  const filteredGames = state.games.filter((game) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      game.title.toLowerCase().includes(keyword) ||
      game.genre.toLowerCase().includes(keyword);

    const matchGenre =
      genre === "all" || game.genre.toLowerCase() === genre;

    return matchSearch && matchGenre;
  });

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(
    indexOfFirstGame,
    indexOfLastGame
  );
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  /* =====================
     LOADING / ERROR
  ===================== */
  if (state.loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="alert alert-error">Failed to load games</div>
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
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative z-20">
          <div className="flex flex-col md:flex-row gap-4">

            {/* SEARCH */}
            <div className="relative flex-1">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search games by title or genre..."
                className="input input-bordered w-full h-14 bg-black/50 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 150)}
              />

              {/* HISTORY DROPDOWN */}
              {showHistory && filteredHistory.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50">
                  {filteredHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-3 text-sm hover:bg-white/10"
                    >
                      <button
                        type="button"
                        onMouseDown={() => {
                          setSearch(item);
                          setShowHistory(false);
                        }}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <FiClock className="text-white/50" />
                        {item}
                      </button>

                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeHistory(item);
                        }}
                        className="text-white/40 hover:text-red-400"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="select select-bordered h-14 bg-black/50 text-white w-full md:w-56"
            >
              <option value="all">All Genres</option>
              <option value="shooter">Shooter</option>
              <option value="mmorpg">MMORPG</option>
              <option value="rpg">RPG</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>
        </div>

        {/* GAME GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12"
        >
          {currentGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                type="button"
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => p - 1);
                  gridRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                «
              </button>

              <button
                type="button"
                className="join-item btn btn-disabled"
              >
                Page {currentPage} of {totalPages}
              </button>

              <button
                type="button"
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => p + 1);
                  gridRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Games;
