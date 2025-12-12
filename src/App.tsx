import React, { Suspense } from 'react';
import { Loading } from './components/Loading';
import { DojoExperience } from './components/DojoExperience';
import { UserInterface } from './components/UserInterface';

function App() {
  const [mouseSensitivity, setMouseSensitivity] = React.useState(0.002);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      <Suspense fallback={<Loading />}>
        <DojoExperience mouseSensitivity={mouseSensitivity} />
        <UserInterface sensitivity={mouseSensitivity} setSensitivity={setMouseSensitivity} />
      </Suspense>
    </div>
  );
}

export default App;