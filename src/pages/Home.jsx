import React from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/video3.mp4";

function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden text-white">
        {/* Background Video */}
        <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bgVideo} autoPlay 
        loop muted playsInline />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
          <div className="w-full">
            <h1 className="text-5xl font-light mb-6 leading-tight">
              DISCOVER <br />
              <span className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                AMAZING GAMES
              </span>
            </h1>

            <p className="max-w-xl mb-8 text-gray-200 leading-relaxed">
              GameHub is a platform that offers thousands of free-to-play games
              from various genres such as action, RPG, strategy, shooter, and
              many more. All games can be played instantly without installation,
              allowing you to enjoy gaming anytime and anywhere with ease.
            </p>

            <div className="flex gap-4">
              <Link to="/games"
              className="btn btn-lg bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white hover:from-blue-500 hover:to-purple-500"
              > Explore Games
              </Link>
              <Link to="/favorites"
              className="btn btn-lg btn-outline border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
              >My Favorites
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;