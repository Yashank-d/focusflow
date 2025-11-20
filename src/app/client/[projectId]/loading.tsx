import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-64 h-6" />
        <Skeleton className="w-full max-w-2xl h-[300px] rounded-2xl mt-6" />
      </div>
    </main>
  );
}
