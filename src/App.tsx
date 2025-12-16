import React, { Suspense } from 'react';
import { Loading } from './components/Loading';
import { DojoExperience } from './components/DojoExperience';
import { UserInterface } from './components/UserInterface';

function App() {
  const [mouseSensitivity, setMouseSensitivity] = React.useState(0.002);
  const [showBoundary, setShowBoundary] = React.useState(false);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      <Suspense fallback={<Loading />}>
        <DojoExperience mouseSensitivity={mouseSensitivity} showBoundary={showBoundary} />
        <UserInterface 
          sensitivity={mouseSensitivity} 
          setSensitivity={setMouseSensitivity}
          showBoundary={showBoundary}
          setShowBoundary={setShowBoundary}
        />
      </Suspense>
    </div>
  );
}

export default App;