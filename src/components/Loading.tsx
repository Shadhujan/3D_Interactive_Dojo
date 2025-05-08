import React from 'react';
import { Loader } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <Loader size={48} className="animate-spin mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Loading Dojo Environment</h2>
      <p className="text-gray-400">Please wait while we prepare your experience...</p>
    </div>
  );
};