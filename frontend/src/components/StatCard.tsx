interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  // Optional: D&D Modifier calculation (e.g., 18 becomes +4)
  const modifier = Math.floor((value - 10) / 2);
  const modString = modifier >= 0 ? `+${modifier}` : modifier;

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg shadow-xs min-w-17.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="text-xl font-black text-slate-800 tabular-nums">
        {value}
      </span>
      <span className="text-[10px] font-medium text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full">
        {modString}
      </span>
    </div>
  );
}