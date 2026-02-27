import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-bg">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-(image:--image-glow) pointer-events-none opacity-50" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* 404 number */}
        <p className="text-[120px] md:text-[160px] font-serif leading-none text-transparent bg-clip-text bg-linear-to-b from-white/20 to-transparent select-none mb-2">
          404
        </p>

        {/* Message */}
        <h1 className="text-xl md:text-2xl font-serif text-white mb-3 leading-snug">
          This page doesn&apos;t exist
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. If you&apos;re looking for a client gallery,
          double-check the link you were sent.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Go to homepage
          </Link>
          <Link
            href="/api/auth/signin"
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Sign in to dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-[11px] text-gray-700 uppercase tracking-widest">
        FocusFlow
      </div>
    </main>
  );
}
