'use client';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Loading…' }: LoaderProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7F8 50%, #FFFCFD 100%)' }}>

      {/* Spinner stack */}
      <div className="relative flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-rose-100" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#BE123C] animate-spin" />
        {/* Inner spinning ring — counter */}
        <div className="absolute rounded-full border-[2px] border-transparent border-b-[#F43F5E] animate-spin"
          style={{ inset: '10px', animationDirection: 'reverse', animationDuration: '0.8s' }} />
        {/* Centre dot */}
        <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #BE123C, #F43F5E)' }} />
      </div>

      {/* Brand pill */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{ color: '#BE123C', background: '#FFF1F2', border: '1.5px solid rgba(190,18,60,0.20)' }}>
          INNOVATIQ
        </span>
        <p className="text-sm font-medium" style={{ color: '#334155' }}>{message}</p>
      </div>

    </div>
  );
}
