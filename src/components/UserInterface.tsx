import React, { useState } from 'react';
import { Info, X, Volume2, VolumeX, Settings, Gamepad2 } from 'lucide-react';
import { ControlsGuide } from './ControlsGuide';

interface UserInterfaceProps {
  sensitivity: number;
  setSensitivity: (value: number) => void;
}

export const UserInterface: React.FC<UserInterfaceProps> = ({ sensitivity, setSensitivity }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [muted, setMuted] = useState(false);
  

  return (
    <>
      {/* Bottom Controls Bar */}
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
              onClick={() => setShowSettings(!showSettings)}
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
      </div>
      
      {/* Settings Panel - High Z-Index & Independent Layer */}
      {showSettings && (
         <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 z-50 pointer-events-auto">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl">
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors pointer-events-auto"
                aria-label="Close Settings"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Settings</h2>
              
              <div className="mb-6">
                <label htmlFor="sensitivity" className="block text-sm font-medium text-gray-700 mb-2">
                  Mouse Sensitivity
                </label>
                <input
                  id="sensitivity"
                  type="range"
                  min="0.0005"
                  max="0.1"
                  step="0.0001"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
         </div>
      )}

      {/* Info Panel - High Z-Index & Independent Layer */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 z-50 pointer-events-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors pointer-events-auto"
              aria-label="Close Info"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Experience</h2>
            <div className="prose text-gray-800">
              <p>This is an immersive 3D Japanese dojo environment created with Three.js.</p>
              <h3 className="font-bold mt-4 mb-2">Controls</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>W, A, S, D</strong> - Move around</li>
                <li><strong>Mouse</strong> - Look around</li>
                <li><strong>Click</strong> - Interact with objects</li>
                <li><strong>Shift</strong> - Run</li>
                <li><strong>Space</strong> - Jump</li>
              </ul>
              <h3 className="font-bold mt-4 mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
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
    </>
  );
};