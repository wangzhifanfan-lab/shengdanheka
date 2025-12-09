import React from 'react';
import { Experience } from './components/Experience';
import { Overlay } from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#01150e] relative overflow-hidden">
      <Overlay />
      <div className="absolute inset-0 z-0">
        <Experience />
      </div>
    </div>
  );
};

export default App;
