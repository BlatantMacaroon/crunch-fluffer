import { StatCard } from './StatCard';
import type { CrunchDto } from '@shared/types/crunchDtos.ts';

export function StatGrid({ stats }: { stats: CrunchDto }) {
  return (
    <div className="flex flex-wrap gap-3 py-4">
      <StatCard label="Str" value={stats.strength} />
      <StatCard label="Dex" value={stats.dexterity} />
      <StatCard label="Con" value={stats.constitution} />
      <StatCard label="Int" value={stats.intelligence} />
      <StatCard label="Wis" value={stats.wisdom} />
      <StatCard label="Cha" value={stats.charisma} />
    </div>
  );
}