import { createContext, useReducer, useContext, useEffect } from "react";

const GameContext = createContext(); // Create GameContext

const initialState = {
  games: [], //Saving all games
  favorites: JSON.parse(localStorage.getItem("gameFavorites")) || [], // Load favorites from LocalStorage
  loading: false,
  error: null,
};
// Reducer function to manage state based on action types
const gameReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GAMES_START":
      return { ...state, loading: true, error: null };
    // if fetching data is successful
    case "FETCH_GAMES_SUCCESS":
      return { ...state, games: action.payload, loading: false };
    // if fetching data fails
    case "FETCH_GAMES_FAIL":
      return { ...state, loading: false, error: action.payload };
    // Add game to favorites List
    case "ADD_FAVORITE": {
      const updatedFavorites = [...state.favorites, action.payload]; // Add new game to favorites list
      localStorage.setItem("gameFavorites", JSON.stringify(updatedFavorites));// Update LocalStorage
      return { ...state, favorites: updatedFavorites }; // Return updated state
    }
    // Remove game from favorites list
    case "REMOVE_FAVORITE": {
      const updatedFavorites = state.favorites.filter( // Filter out the game to be removed
        (fav) => fav.id !== action.payload // action.payload is the id of the game to remove
      );
      localStorage.setItem("gameFavorites", JSON.stringify(updatedFavorites)); 
      return { ...state, favorites: updatedFavorites };
    }

    default:
      return state;
  }
};
// GameProvider component to wrap around the app
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState); // useReducer for state management
  // function to fetch games from API
  const fetchGames = async () => {
    dispatch({ type: "FETCH_GAMES_START" });

    try {
      // Fetch games from API
      const response = await fetch("/api/games");
      // Check if response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch game data");
      }

      const data = await response.json(); // Parse JSON response
      // Validate data format
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format"); 
      }
      // Dispatch success action with fetched data
      dispatch({
        type: "FETCH_GAMES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Fetch games error:", error); // Log error for debugging
      dispatch({
        type: "FETCH_GAMES_FAIL",
        payload: error.message,
      });
    }
  };
  // Add game to favorites List 
  const addFavorite = (game) => {
    if (!state.favorites.some((fav) => fav.id === game.id)) {
      dispatch({ type: "ADD_FAVORITE", payload: game }); // Dispatch add favorite action
    }
  };
  // Remove game from favorites List
  const removeFavorite = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id }); // Dispatch remove favorite action
  };
  // Check if a game is in favorites
  const isFavorite = (id) => {
    return state.favorites.some((fav) => fav.id === id); // Return true if game is favorite
  };
  
  useEffect(() => {
    fetchGames();
  }, []);
  // Providing state and functions to all components
  return (
    <GameContext.Provider
      value={{
        state,           // global state
        addFavorite,     // function to add favorite
        removeFavorite,  // function to remove favorite
        isFavorite,      // check if game is favorite
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
// Custom hook to use GameContext
export const useGameContext = () => {
  const context = useContext(GameContext); // Access GameContext
  if (!context) {
    throw new Error("useGameContext must be used inside a GameProvider"); // Error if used outside provider
  }
  return context;
};