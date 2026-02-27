export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 md:p-8 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-7 w-32 bg-white/5 rounded-lg mb-2" />
          <div className="h-4 w-56 bg-white/3 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-28 bg-white/5 rounded-xl" />
          <div className="h-9 w-28 bg-white/5 rounded-xl" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/5 bg-slate-900/40 p-5"
            style={{ opacity: 1 - i * 0.1 }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="h-4 w-28 bg-white/5 rounded" />
              <div className="h-4 w-16 bg-white/3 rounded" />
            </div>
            {/* Client row */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-white/4" />
              <div className="h-3 w-20 bg-white/3 rounded" />
            </div>
            {/* Status badge */}
            <div className="h-5 w-24 bg-white/4 rounded-full" />
            {/* Divider */}
            <div className="border-t border-white/4 mt-4 pt-4 flex items-center justify-between">
              <div className="h-3 w-20 bg-white/3 rounded" />
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-white/3 rounded" />
                <div className="w-4 h-4 bg-white/3 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
