import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useGameContext } from "../context/GameContext";

function Navbar() {
  const { state } = useGameContext();
  const totalFavorites = state.favorites.length;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center text-white">
        
        <h1 className="text-lg font-light tracking-widest">
          Collection Of Games
        </h1>

        <div className="flex items-center gap-10 text-xs uppercase tracking-widest">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <Link to="/games" className="hover:text-pink-500">Games</Link>

          {/* FAVORITES ICON + BADGE */}
          <Link
            to="/favorites"
            className="relative text-xl text-white/60 hover:text-pink-500 transition-colors duration-300"
            title="Favorites"
          >
            <FiHeart />

            {totalFavorites > 0 && (
  <span className="
    absolute 
    -top-1 
    -right-1
    min-w-[16px] 
    h-[16px]
    px-1
    text-[10px]
    leading-[16px]
    text-white
    bg-pink-500
    rounded-full
    flex items-center justify-center
  ">
    {totalFavorites}
  </span>
)}

          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
