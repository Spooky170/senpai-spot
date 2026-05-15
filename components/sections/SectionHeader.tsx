interface SectionHeaderProps {
  title:        string;
  subtitle?:    string;
  accentWord?:  string;
  action?:      { label: string; href: string };
}

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function SectionHeader({ title, subtitle, accentWord, action }: SectionHeaderProps) {
  const renderTitle = () => {
    if (!accentWord) {
      return <span className="gradient-text">{title}</span>;
    }
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="flex items-end justify-between mb-10 gap-4">
      <div>
        <div className="section-divider mb-4" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-white leading-tight">
          {renderTitle()}
        </h2>
        {subtitle && (
          <p className="text-white/40 text-sm mt-2 font-accent tracking-wide max-w-lg">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex-shrink-0 flex items-center gap-1.5 text-sm text-orange-500 font-accent font-semibold tracking-wider uppercase hover:gap-2.5 transition-all duration-300 group"
        >
          {action.label}
          <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
