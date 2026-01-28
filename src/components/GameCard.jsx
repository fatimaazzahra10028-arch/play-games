import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGameContext } from "../context/GameContext";

const GameCard = ({ game }) => {
  const { addFavorite, removeFavorite, isFavorite } = useGameContext();
  const favorite = isFavorite(game.id);

  return (
    <Link
      to={`/games/${game.id}`}
      className="group card bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden shadow-lg transition"
    >
      <figure className="h-44 overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </figure>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">
            {game.title}
          </h3>

          <button
          onClick={(e) => {
            e.preventDefault();
            favorite ? removeFavorite(game.id) : addFavorite(game); }}
            className="text-xl"
            title="Favorite">
              {favorite ? (
                <FaHeart className="text-pink-500 transition scale-110" /> ) : (
                <FaRegHeart className="text-white/50 hover:text-pink-400 transition" />
             )}
          </button>
        </div>

        <p className="text-sm text-gray-400">{game.genre}</p>
        <p className="text-xs text-gray-500 line-clamp-2">
          {game.short_description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="badge badge-outline text-xs">
            {game.platform}
          </span>
          <span className="text-xs text-primary">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;