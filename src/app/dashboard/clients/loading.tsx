import Skeleton from "@/components/ui/Skeleton";

export default function LoadingClients() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-white/10 bg-white/5"
        >
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
