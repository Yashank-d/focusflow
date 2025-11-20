interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function GlassInput({
  label,
  className = "",
  ...props
}: GlassInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 
          bg-white/5 border border-white/10 rounded-lg 
          text-white placeholder-gray-500
          focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/20
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
