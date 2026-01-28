import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import GamesDetail from './pages/GamesDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
          <Navbar />

          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GamesDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>

          <footer className="mt-20 py-6 text-center text-gray-400 border-t border-gray-800">
            <p>© 2024 GameHub — Free Game Collection</p>
            <p className="text-sm mt-2">Powered by the FreeToGame API</p>
          </footer>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;