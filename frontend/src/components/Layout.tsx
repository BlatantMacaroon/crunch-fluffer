interface LayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar: Fixed width, scrollable, with a subtle border */}
      <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shadow-xs">
        <div className="p-6 border-b border-slate-50">
          <h1 className="text-xl font-black text-indigo-600 tracking-tight">
            CRUNCH & FLUFF
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {sidebar}
        </div>
      </aside>

      {/* Main Content: Flexible width, scrollable */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <div className="max-w-4xl mx-auto p-10">
          {children}
        </div>
      </main>
    </div>
  );
}