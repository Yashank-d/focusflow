import { Loader2 } from "lucide-react";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export default function GradientButton({
  isLoading,
  variant = "primary",
  className = "",
  children,
  ...props
}: GradientButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group";

  const variants = {
    primary:
      "text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] border border-white/20",
    secondary:
      "text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10",
    danger:
      "text-red-200 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-100",
  };

  // Background gradients for primary
  const primaryGradient =
    "absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-100 transition-opacity duration-300";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {variant === "primary" && <span className={primaryGradient}></span>}

      <span className="relative flex items-center gap-2">
        {isLoading && <Loader2 className="animate-spin" size={16} />}
        {children}
      </span>
    </button>
  );
}
