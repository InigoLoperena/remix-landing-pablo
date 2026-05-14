import { Zap, Droplets, Trees, Trash2, Armchair, Skull, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WastelandButton, SectionHeading } from './WastelandNav';
import { Input } from '@/components/ui/input';

export const ImpactPanelSection = () => {
  const stats = [
    { label: 'CO2 Saved', value: '55 lb.', icon: <img src="https://api.iconify.design/pixelarticons/cloud.svg?color=%23699e4b" alt="CO2" className="w-8 h-8 object-contain" style={{ imageRendering: 'pixelated' }} /> },
    { label: 'Water Saved', value: '72 gal.', icon: <img src="https://api.iconify.design/pixelarticons/drop.svg?color=%233ea7e5" alt="Water" className="w-8 h-8 object-contain" style={{ imageRendering: 'pixelated' }} /> },
    { label: 'Trees Saved', value: '6 TREES', icon: <img src="https://api.iconify.design/pixelarticons/tree.svg?color=%237ac142" alt="Tree" className="w-8 h-8 object-contain" style={{ imageRendering: 'pixelated' }} /> },
    { label: 'Waste Diverted', value: '85 lb.', icon: <img src="https://api.iconify.design/pixelarticons/trash.svg?color=%239b8676" alt="Waste" className="w-8 h-8 object-contain" style={{ imageRendering: 'pixelated' }} /> },
  ];

  return (
    <section className="py-16 bg-parchment border-b-4 border-rust industrial-grid">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <span className="inline-block px-2 py-1 bg-toxic-green text-rust text-[10px] font-mono-vt font-bold mb-4 tracking-widest uppercase border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
            GAMIFICATION
          </span>
          <h2 className="text-5xl md:text-7xl font-display text-rust mb-6 drop-shadow-[2px_2px_0px_rgba(61,38,22,0.3)] tracking-wider leading-none uppercase">
            TURN YOUR DAILY WALK INTO A SIDE QUEST.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-rust/5 p-6 border-2 border-rust pixel-shadow">
              <h3 className="text-xl font-display tracking-widest text-toxic-green mb-3 uppercase">01. Stack GreenCoins</h3>
              <p className="font-mono-vt text-lg text-rust font-bold">Earn digital currency every time you contribute to the map.</p>
            </div>
            <div className="bg-rust/5 p-6 border-2 border-rust pixel-shadow">
              <h3 className="text-xl font-display tracking-widest text-[#3ea7e5] mb-3 uppercase">02. Track Your Impact</h3>
              <p className="font-mono-vt text-lg text-rust font-bold">Watch your dashboard grow. See exactly how much CO2 and water you've saved by rescuing instead of buying new.</p>
            </div>
            <div className="bg-rust/5 p-6 border-2 border-rust pixel-shadow">
              <h3 className="text-xl font-display tracking-widest text-rust mb-3 uppercase">03. Climb the Ranks</h3>
              <p className="font-mono-vt text-lg text-rust font-bold">Go from a street rookie to a local legend. Compete with your neighborhood to see who saves the most loot.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="parchment p-8 scrap-border pixel-shadow relative overflow-hidden">
            <div className="mb-8 text-center border-b-4 border-rust pb-4 flex flex-col items-center justify-center gap-2">
              <img src="/coin-32.png" alt="Green Point" className="w-16 h-16 object-contain drop-shadow-[4px_4px_0px_rgba(61,38,22,0.4)]" style={{ imageRendering: 'pixelated' }} />
              <h3 className="text-3xl font-pixel text-rust">120 Green Points</h3>
            </div>
            <div className="space-y-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className="text-rust p-2 bg-rust/10 border-2 border-rust">{stat.icon}</div>
                     <span className="text-lg md:text-xl font-pixel text-rust group-hover:text-toxic-green transition-colors">{stat.label}</span>
                  </div>
                  <span className="text-xl md:text-2xl font-mono-vt font-bold text-rust bg-parchment px-2 py-1 border-2 border-rust">{stat.value}</span>
                </div>
              ))}
              <div className="mt-8 pt-8 border-t-4 border-rust flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-toxic-green border-2 border-rust flex items-center justify-center p-2 shadow-[2px_2px_0px_#3d2616]">
                    <Armchair className="text-rust" size={32} />
                  </div>
                  <span className="text-xl md:text-2xl font-pixel text-rust tracking-widest leading-tight">41 Items Rescued</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-parchment/80 p-6 scrap-border pixel-shadow overflow-hidden relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-pixel text-rust tracking-widest">New York Ranking</h3>
              <div className="text-[10px] font-mono-vt font-bold text-rust/80 bg-toxic-green inline-block px-2 py-1 border border-rust mt-2">SECURE_FEED // LIVE_STATUS</div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'GaiaGuard Nick', points: '3,100', rank: '#1', color: 'text-toxic-green' },
                { name: 'EcoWatden',       points: '2,950', rank: '#2', color: 'text-rust' },
                { name: 'Dr Green',        points: '2,750', rank: '#3', color: 'text-rust' },
                { name: 'Lily Pamirez',    points: '2,600', rank: '#4', color: 'text-rust' },
              ].map((user, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3 border-2 border-rust bg-parchment hover:bg-[#3ea7e5]/20 transition-all overflow-hidden pixel-shadow mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-vt font-black text-[14px] text-rust shrink-0 bg-rust/10 px-2 py-1">{user.rank}</span>
                    <div className="w-10 h-10 bg-rust border-2 border-rust flex items-center justify-center shrink-0">
                      <Skull size={20} className="text-parchment" />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-pixel text-lg truncate ${user.color}`}>{user.name}</div>
                      <div className="text-[10px] font-mono-vt font-bold text-rust/60 truncate uppercase tracking-tighter">
                        SCAVENGER // LEVEL {10 - idx}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-rust/10 pt-2 sm:pt-0">
                    <div className="text-toxic-green font-mono-vt font-bold text-xs sm:text-sm shrink-0">
                      {user.points} <span className="sm:hidden">GP</span><span className="hidden sm:inline"> GreenPoints</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FinalCtaProps {
  email: string;
  loading: boolean;
  onEmailChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FinalCtaSection = ({ email, loading, onEmailChange, onSubmit }: FinalCtaProps) => (
  <section className="py-24 md:py-32 relative overflow-hidden bg-parchment/40 border-t-4 border-rust industrial-grid">
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_100%)]" />
      <div className="hazard-stripes h-20 absolute top-0 left-0 right-0 opacity-10" />
      <div className="hazard-stripes h-20 absolute bottom-0 left-0 right-0 opacity-10" />
    </div>
    <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-display mb-8 tracking-wider text-rust uppercase leading-none drop-shadow-[4px_4px_0px_rgba(61,38,22,0.2)]">
        THE GARBAGE TRUCKS ARE ALREADY ON THEIR WAY.
      </h2>
      <p className="text-xl md:text-3xl font-mono-vt font-bold text-rust max-w-4xl mx-auto mb-12">
        There is a perfect piece of furniture waiting on a curb near you right now. Will you get there first?
      </p>
      <div className="flex flex-col items-center gap-10">
        <WastelandButton
          variant="primary"
          className="text-xl md:text-3xl px-12 md:px-20 py-6 md:py-8 scale-110 border-4 border-rust shadow-[8px_8px_0px_#3d2616]"
          onClick={() => window.location.href = 'https://green-hunt-web-v1.vercel.app/app'}
        >
          START HUNTING NOW
        </WastelandButton>

        {/* Waitlist signup */}
        <div className="w-full max-w-md mt-8">
          <p className="text-[12px] font-mono-vt font-bold text-rust tracking-[0.2em] uppercase mb-4 bg-toxic-green inline-block px-3 py-1 border-2 border-rust shadow-[2px_2px_0px_#3d2616]">
            OR GET BETA & PROJECT UPDATES
          </p>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => onEmailChange(e.target.value)}
              required
              disabled={loading}
              className="flex-1 bg-parchment border-4 border-rust text-rust placeholder:text-rust/60 font-mono-vt text-sm font-bold shadow-[inset_2px_2px_0px_rgba(61,38,22,0.2)] rounded-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-toxic-green !text-rust font-mono-vt font-black border-4 border-rust uppercase tracking-widest hover:bg-toxic-green/80 shadow-[4px_4px_0px_#3d2616] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? 'SENDING...' : 'GET BETA'}
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4 text-[12px] font-mono-vt font-bold tracking-widest text-parchment italic uppercase bg-rust px-4 py-2 border-4 border-parchment pixel-shadow">
          <Skull size={14} className="text-parchment" /> REGISTER_ENCRYPTED // SURVIVE THE MACHINE
        </div>
      </div>
    </div>
  </section>
);

export const SocialFooter = ({ t }: { t: (k: string) => string }) => (
  <footer className="relative bg-parchment border-t-4 border-rust">
    <div className="container mx-auto px-10 py-16 max-w-5xl">
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-10">
        {[
          { to: '/legal',   label: t('landing.footer.legal') },
          { to: '/privacy', label: t('landing.footer.privacy') },
          { to: '/cookies', label: t('landing.footer.cookies') },
        ].map((link, i) => (
          <Link key={i} to={link.to} className="font-mono-vt font-bold text-lg text-rust hover:text-toxic-green transition-colors uppercase tracking-widest">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 mb-10">
        {[
          { href: 'https://www.instagram.com/greenhuntstoopingapp/', icon: <Instagram className="h-10 w-10" /> },
          { href: 'https://www.tiktok.com/@greenhuntstoopingapp', icon: (
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
          )},
          { href: 'https://www.youtube.com/@GreenHuntStoopingApp', icon: <Youtube className="h-10 w-10" /> },
          { href: 'https://x.com/StoopingApp', icon: (
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )},
          { href: 'https://www.linkedin.com/company/greenhunt', icon: <Linkedin className="h-10 w-10" /> },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            className="text-dust hover:text-toxic-green hover:scale-125 transition-all duration-300">
            {s.icon}
          </a>
        ))}
      </div>

      <div className="w-full h-px mb-6 bg-gradient-to-r from-transparent via-rust to-transparent opacity-30" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2 px-2 text-rust/80 font-mono-vt font-bold text-xs">
        <div className="flex items-center gap-2">
          <span>Made to stop the linear economy apocalypse</span>
          <span className="text-lg">💀🌍</span>
        </div>
        <a href="mailto:hello@greenhunt.net" className="hover:text-toxic-green transition-colors">
          hello@greenhunt.net
        </a>
      </div>
    </div>
  </footer>
);
