import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Mouse,
  MousePointer,
  KeySquare,
  Footprints,

  X
} from 'lucide-react';

export const ControlsGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-30">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors pointer-events-auto"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Movement Controls</h2>

        <div className="grid gap-8">
          {/* Keyboard Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <KeySquare className="text-indigo-600" />
              Keyboard Movement
            </h3>
            <div className="grid grid-cols-3 gap-4 place-items-center max-w-[200px]">
              <div />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono">W</span>
                </div>
                <ArrowUp className="text-gray-600" size={16} />
                <span className="text-sm text-gray-600">Forward</span>
              </div>
              <div />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono">A</span>
                </div>
                <ArrowLeft className="text-gray-600" size={16} />
                <span className="text-sm text-gray-600">Left</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono">S</span>
                </div>
                <ArrowDown className="text-gray-600" size={16} />
                <span className="text-sm text-gray-600">Back</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono">D</span>
                </div>
                <ArrowRight className="text-gray-600" size={16} />
                <span className="text-sm text-gray-600">Right</span>
              </div>
            </div>
          </div>

          {/* Special Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Footprints className="text-indigo-600" />
              Special Actions
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono text-sm">SHIFT</span>
                </div>
                <span className="text-sm text-gray-600">Hold to Run</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <span className="font-mono text-sm">SPACE</span>
                </div>
                <span className="text-sm text-gray-600">Jump</span>
              </div>
            </div>
          </div>

          {/* Mouse Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mouse className="text-indigo-600" />
              Mouse Controls
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <MousePointer size={20} />
                </div>
                <span className="text-sm text-gray-600">Look Around</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  <Mouse size={20} />
                </div>
                <span className="text-sm text-gray-600">Click to Lock Mouse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};