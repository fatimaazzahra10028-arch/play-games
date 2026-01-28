import { createContext, useReducer, useContext, useEffect } from "react";

const GameContext = createContext();

const initialState = {
  games: [],
  favorites: JSON.parse(localStorage.getItem("gameFavorites")) || [],
  loading: false,
  error: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GAMES_START":
      return { ...state, loading: true, error: null };

    case "FETCH_GAMES_SUCCESS":
      return { ...state, games: action.payload, loading: false };

    case "FETCH_GAMES_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "ADD_FAVORITE": {
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem("gameFavorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    }

    case "REMOVE_FAVORITE": {
      const updatedFavorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
      localStorage.setItem("gameFavorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    }

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const fetchGames = async () => {
    dispatch({ type: "FETCH_GAMES_START" });

    try {
      const response = await fetch("https://www.freetogame.com/api/games");

      if (!response.ok) {
        throw new Error("Gagal mengambil data game");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Format data tidak valid");
      }

      dispatch({
        type: "FETCH_GAMES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Fetch games error:", error);
      dispatch({
        type: "FETCH_GAMES_FAIL",
        payload: error.message,
      });
    }
  };

  const addFavorite = (game) => {
    if (!state.favorites.some((fav) => fav.id === game.id)) {
      dispatch({ type: "ADD_FAVORITE", payload: game });
    }
  };

  const removeFavorite = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

  const isFavorite = (id) => {
    return state.favorites.some((fav) => fav.id === id);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext harus dipakai di dalam GameProvider");
  }
  return context;
};