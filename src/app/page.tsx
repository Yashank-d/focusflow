import LoginButton from "@/components/LoginButton";

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-bg">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-(image:--image-glow) pointer-events-none"></div>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <header className="absolute top-0 left-0 z-10 w-full px-8 py-8 flex items-center justify-center text-gray-500 text-xs font-medium uppercase tracking-widest">
        <div className="hover:text-white cursor-pointer transition-colors">
          FocusFlow v1.0
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 mt-[-5vh]">
        <div
          className="mb-8 animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-gray-400 tracking-[0.2em] uppercase backdrop-blur-md">
            Designed for Photographers
          </span>
        </div>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-500 mb-8 tracking-tight leading-[0.9] animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.3s" }}
        >
          FocusFlow
        </h1>

        <p
          className="text-sm md:text-lg text-gray-400 max-w-md mx-auto mb-12 leading-relaxed font-light animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          Clarity in complexity. The all-in-one workspace to manage clients,
          track projects, and handle payments.
        </p>

        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <LoginButton />
        </div>
      </div>

      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] text-gray-700 uppercase tracking-widest">
          © 2025 FocusFlow Inc.
        </p>
      </footer>
    </main>
  );
}
