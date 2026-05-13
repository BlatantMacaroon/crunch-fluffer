import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Classes, Races } from '@shared/types/crunchDtos.ts';
import type { CrunchDto, Crunch } from '@shared/types/crunchDtos.ts';

interface CrunchFormProps {
  onSuccess: (newCrunch: Crunch) => void;
}

export function CrunchForm({ onSuccess }: CrunchFormProps) {
  const { loading, request } = useApi<Crunch>();

  const STAT_KEYS = [
  'strength', 
  'dexterity', 
  'constitution', 
  'intelligence', 
  'wisdom', 
  'charisma'
] as const;

  // Initial state matching your Dto
  const [formData, setFormData] = useState<CrunchDto>({
    strength: 10, dexterity: 10, constitution: 10,
    intelligence: 10, wisdom: 10, charisma: 10,
    class: 'FIGHTER',
    race: 'HUMAN',
    level: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await request('post', '/crunch', formData);
      if (result) onSuccess(result);
    } catch (err) {
      console.error("Failed to create crunch", err);
    }
  };

  const updateField = (field: keyof CrunchDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Race & Class Row */}
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Race</span>
          <select 
            value={formData.race} 
            onChange={e => updateField('race', e.target.value)}
            className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm p-3"
          >
            {Object.values(Races).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Class</span>
          <select 
            value={formData.class} 
            onChange={e => updateField('class', e.target.value)}
            className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-sm p-3"
          >
            {Object.values(Classes).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {STAT_KEYS.map((stat) => (
            <label key={stat} className="block text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {stat.slice(0, 3)}
            </span>
            <input 
                type="number" 
                min="1" 
                max="20" 
                value={formData[stat]} 
                onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    updateField(stat, isNaN(val) ? 0 : val);
                }}
                className="mt-1 block w-full text-center rounded-xl border-slate-200 bg-slate-50 p-2 font-bold" 
            />
            </label>
        ))}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-indigo-300 transition-all cursor-pointer mt-4"
      >
        {loading ? "Forging..." : "Create Character"}
      </button>
    </form>
  );
}