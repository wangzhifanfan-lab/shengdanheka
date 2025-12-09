import React from 'react';

export const Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10 p-8 md:p-12">
      {/* Header */}
      <header className="flex flex-col items-center md:items-start space-y-4 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-['Cinzel'] text-[#FFD700] tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] text-center md:text-left leading-tight">
          宇航员圣诞快乐
        </h1>
        <h2 className="text-sm md:text-lg font-['Playfair_Display'] text-emerald-200 tracking-wider uppercase border-t border-emerald-500/30 pt-3 w-full text-center md:text-left">
          圣诞老人直接给他袜子里塞钱
        </h2>
      </header>

      {/* Footer / Controls Hint */}
      <footer className="flex justify-between items-end">
        <div className="hidden md:block text-emerald-600/50 font-['Cinzel'] text-xs tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>
          EST. 2024
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-4 pointer-events-auto">
           <div className="bg-black/40 backdrop-blur-md border border-[#C5A059]/30 p-4 rounded-lg shadow-2xl max-w-xs text-right group transition-all hover:border-[#C5A059]">
              <h3 className="text-[#C5A059] font-['Cinzel'] text-lg mb-1">Interactive View</h3>
              <p className="text-emerald-100/80 text-sm font-['Playfair_Display'] italic">
                Drag to rotate. Scroll to zoom.<br/>
                Experience the luxury of silence.
              </p>
           </div>
           
           <button 
             onClick={() => window.location.reload()}
             className="px-6 py-2 bg-[#C5A059] text-[#01150e] font-['Cinzel'] font-bold tracking-widest text-xs hover:bg-white transition-colors duration-500 shadow-[0_0_20px_rgba(197,160,89,0.3)]"
           >
             RESET SCENE
           </button>
        </div>
      </footer>
    </div>
  );
};