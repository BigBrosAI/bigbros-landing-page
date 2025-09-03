import { Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      {showText && (
        <span className="font-bold text-xl text-primary">
          BIGBROS AI
        </span>
      )}
    </div>
  );
}