import React, { useState } from 'react';
import { Info, X, Volume2, VolumeX, Settings, Gamepad2 } from 'lucide-react';
import { ControlsGuide } from './ControlsGuide';

export const UserInterface: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(false);
  
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
      <div className="flex justify-between items-end max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={() => setMuted(!muted)}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Info size={20} />
          </button>
          <button 
            onClick={() => setShowControls(!showControls)}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Gamepad2 size={20} />
          </button>
          <button 
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
        
        {/* Instructions */}
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg pointer-events-auto">
          <p>WASD to move | Mouse to look | Click to interact</p>
        </div>
      </div>
      
      {/* Info Panel */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 z-20 pointer-events-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
            <div className="prose">
              <p>This is an immersive 3D Japanese dojo environment created with Three.js.</p>
              <h3>Controls</h3>
              <ul>
                <li><strong>W, A, S, D</strong> - Move around</li>
                <li><strong>Mouse</strong> - Look around</li>
                <li><strong>Click</strong> - Interact with objects</li>
                <li><strong>Shift</strong> - Run</li>
                <li><strong>Space</strong> - Jump</li>
              </ul>
              <h3>Features</h3>
              <ul>
                <li>Realistic dojo exterior and interior</li>
                <li>Day/night cycle with dynamic lighting</li>
                <li>Interactive elements</li>
                <li>Ambient sounds and music</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Controls Guide */}
      {showControls && <ControlsGuide onClose={() => setShowControls(false)} />}
    </div>
  );
};