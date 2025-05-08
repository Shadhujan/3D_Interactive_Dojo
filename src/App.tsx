import React, { Suspense } from 'react';
import { Loading } from './components/Loading';
import { DojoExperience } from './components/DojoExperience';
import { UserInterface } from './components/UserInterface';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      <Suspense fallback={<Loading />}>
        <DojoExperience />
        <UserInterface />
      </Suspense>
    </div>
  );
}

export default App;