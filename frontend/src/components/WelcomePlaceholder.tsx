export function WelcomePlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-entrance">
      {/* A simple decorative icon using an emoji or a styled div */}
      <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-3xl mb-6 flex items-center justify-center text-3xl shadow-sm border border-indigo-100/50">
        📜
      </div>
      
      <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
        The Archive is Empty
      </h2>
      
      <p className="text-slate-500 max-w-xs leading-relaxed">
        Select a character from the roster or forge a new hero to begin their chronicle.
      </p>

      {/* Subtle background decoration */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none select-none">
        <h1 className="text-9xl font-black uppercase">Crunch</h1>
      </div>
    </div>
  );
}