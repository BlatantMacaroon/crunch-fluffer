import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import type { Crunch } from '@shared/types/crunchDtos.ts';
import { StatGrid } from '../components/StatGrid';
import { FluffDisplay } from './FluffDisplay';

interface CharacterDetailProps {
  crunchId: string;
}

export function CrunchDetail({ crunchId }: CharacterDetailProps) {
  // We use the hook specifically for one CrunchDto
  const { data: crunch, loading, error, request } = useApi<Crunch>();

  useEffect(() => {
    if (crunchId) {
      request('get', `/crunch/${crunchId}`);
    }
  }, [crunchId, request]);

  console.log(crunch);

  if (loading) return <div className="p-8 text-slate-400 animate-pulse">Loading stats...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!crunch) return null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
          {crunch.race} {crunch.class}
        </h1>
        <p className="text-slate-500 font-medium">Level {crunch.level}</p>
      </header>

      {/* The Stat Grid */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Attributes</h3>        
        <StatGrid stats={crunch} />
      </section>
        
      <div className="space-y-12">
        {/* ... Header and StatGrid ... */}

        <div className="pt-12">
          <FluffDisplay crunchId={crunchId} />
        </div>
      </div>
    </div>
  );
}