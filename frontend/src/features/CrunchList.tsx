// src/features/CharacterList.tsx
import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import type { Crunch } from '@shared/types/crunchDtos';

export function CrunchList({ onSelect }: { onSelect: (id: string) => void }) {
  const { data: characters, request } = useApi<Crunch[]>();

  useEffect(() => {
    request('get', '/crunch');
  }, [request]);

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Roster</h2>
      <div className="flex flex-col gap-2">
        {characters?.map((crunch) => (
          <button
            key={crunch._id}
            onClick={() => onSelect(crunch._id)}
            className="w-full text-left p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="font-bold text-slate-700">{crunch.race} {crunch.class}</div>
            <div className="text-xs text-slate-400">Level {crunch.level}</div>
          </button>
        ))}
      </div>
    </div>
  );
}