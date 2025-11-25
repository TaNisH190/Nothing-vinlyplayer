import React, { useState, useRef, useEffect } from 'react';

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    { title: "Summer Vibes", artist: "The Groove" },
    { title: "Midnight Dreams", artist: "Luna & Stars" },
    { title: "Electric Soul", artist: "Neon Nights" }
  ];
  
  const [currentTrack, setCurrentTrack] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 w-80 h-80 border border-gray-700 flex flex-col justify-center items-center">
        
        {/* Vinyl Record Section with Invisible Button */}
        <div className="flex justify-center items-center flex-1 relative mb-4">
          <button 
            onClick={togglePlay}
            className="relative cursor-pointer focus:outline-none group"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {/* Vinyl Disc */}
            <div 
              className={`w-48 h-48 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-xl transition-all duration-300 ${
                isPlaying ? 'animate-spin' : ''
              } group-hover:scale-105`}
              style={{ animationDuration: '3s' }}
            >
              {/* Grooves */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gray-700 opacity-30"
                  style={{ margin: `${6 + i * 8}px` }}
                />
              ))}
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-gray-900" />
                </div>
              </div>
            </div>
            

          </button>
        </div>

        {/* Track Info */}
        <div className="text-center">
          <h3 className="text-base font-bold text-white truncate px-4">
            {tracks[currentTrack].title}
          </h3>
          <p className="text-sm text-gray-400 truncate px-4">{tracks[currentTrack].artist}</p>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          onEnded={handleNext}
        />
      </div>
    </div>
  );
}