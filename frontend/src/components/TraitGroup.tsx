export function TraitGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-600 italic border-l-2 border-indigo-500 pl-4 py-1">
            "{item}"
          </li>
        ))}
      </ul>
    </div>
  );
}