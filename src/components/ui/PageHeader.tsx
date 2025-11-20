interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-linear-to-br from-white to-gray-400">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-400 mt-2 text-sm font-light tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
