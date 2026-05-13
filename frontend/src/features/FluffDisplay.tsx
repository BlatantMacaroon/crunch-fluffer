import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi'; // Path corrected
import type { Fluff } from '@shared/types/fluffDtos.ts'; // Import type

export function FluffDisplay({ crunchId }: { crunchId: string }) {
  const [fluffs, setFluffs] = useState<Fluff[]>([]);
  const [themeInput, setThemeInput] = useState("");
  // Track which version we are looking at (0 is always latest)
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);

  const { loading: fetching, request: fetchRequest } = useApi<Fluff[]>();
  const { loading: generating, request: generateRequest } = useApi<Fluff>();

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchRequest('get', `/fluff?crunchId=${crunchId}`);
      if (result) {
        setFluffs(result);
        setActiveVersionIndex(0); // Reset to latest on character change
      }
    };
    loadData();
  }, [crunchId, fetchRequest]);

  const handleGenerate = async () => {
    try {
      const keywords = themeInput.split(',').map(s => s.trim()).filter(s => s !== "");
      // Path corrected to /fluff/${crunchId}
      const newFluff = await generateRequest('post', `/fluff/${crunchId}`, { 
        themeKeywords: keywords 
      });

      if (newFluff) {
        setFluffs((prev) => [newFluff, ...prev]);
        setActiveVersionIndex(0); // View the brand new one immediately
        setThemeInput(""); 
      }
    } catch (err) {
      console.error("Generation failed", err);
    }
  };

  if (fetching && fluffs.length === 0) {
    return <div className="py-20 text-slate-400 animate-pulse font-serif italic text-center">Unrolling the parchment...</div>;
  }

  const currentFluff = fluffs[activeVersionIndex];

  return (
    <div className="space-y-8">
      {/* 1. TOP CONTROLS */}
      <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <input 
            type="text"
            placeholder="Theme keywords (e.g. Grimdark, High Seas)..."
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            disabled={generating}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-sm"
          />
          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-indigo-300 transition-all cursor-pointer whitespace-nowrap"
          >
            {generating ? "✨ Weaving..." : "✨ New Chronicle"}
          </button>
        </div>
      </section>

      {/* 2. VERSION RIBBON (Succinct History) */}
      {fluffs.length > 1 && (
        <nav className="flex items-center gap-2 overflow-x-auto py-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-2">History:</span>
          {fluffs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveVersionIndex(index)}
              className={`
                flex-none w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer
                ${activeVersionIndex === index 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-300'}
              `}
            >
              {fluffs.length - index}
            </button>
          ))}
        </nav>
      )}

      {/* 3. THE CHRONICLE DISPLAY */}
      {currentFluff && (
        <div 
            key={currentFluff._id} 
            className="space-y-10 animate-entrance"
        >
          {/* Appearance Section */}
          <section className="bg-amber-50/40 p-8 rounded-3xl border border-amber-100/50">
            <h3 className="text-[10px] font-black text-amber-700/50 uppercase tracking-[0.3em] mb-4">Physicality</h3>
            <p className="text-slate-700 font-medium leading-relaxed italic">
              "{currentFluff.appearance}"
            </p>
          </section>

          {/* Narrative Section */}
          <section className="relative px-4">
            <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-indigo-100 rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">The Chronicle</h3>
            <div className="text-slate-700 leading-relaxed text-lg font-serif whitespace-pre-wrap">
              {currentFluff.backstory}
            </div>
          </section>

          {/* Traits Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-10 border-t border-slate-100">
            <TraitGroup title="Personality" items={currentFluff.personalityTraits} />
            <TraitGroup title="Ideals" items={currentFluff.ideals} />
            <TraitGroup title="Bonds" items={currentFluff.bonds} />
            <TraitGroup title="Flaws" items={currentFluff.flaws} />
          </section>

          <footer className="text-[9px] text-slate-300 uppercase tracking-widest text-center">
            {new Date(currentFluff.createdAt).toLocaleString()} • {currentFluff.generationMetadata?.model}
          </footer>
        </div>
      )}
    </div>
  );
}

function TraitGroup({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-600 italic border-l-2 border-indigo-500/30 pl-4 py-1">
            "{item}"
          </li>
        ))}
      </ul>
    </div>
  );
}