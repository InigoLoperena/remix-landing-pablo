import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { StructuredData } from '@/components/StructuredData';

// Wasteland components
import { WastelandAudio } from '@/components/wasteland/WastelandEffects';
import { WastelandNavbar, WastelandTicker } from '@/components/wasteland/WastelandNav';
import { HeroSection, TheCoreLoopSection, TheManifestoSection, AddLootSection, FaqSection } from '@/components/wasteland/WastelandSections';
import { BoardGameMapSection } from '@/components/wasteland/WastelandMap';
import { ImpactPanelSection, FinalCtaSection, SocialFooter } from '@/components/wasteland/WastelandImpact';

const emailSchema = z.string().email();

export default function LandingPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      toast.error(t('landing.beta.invalidEmail'));
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const { error } = await supabase.from('beta_testers').insert([{ email: email.toLowerCase().trim() }]);
      if (error) {
        toast.error(error.code === '23505' ? t('landing.beta.emailExists') : t('landing.beta.error'));
      } else {
        const userEmail = email.toLowerCase().trim();
        toast.success(t('landing.beta.success'));
        setEmail('');
        try {
          await supabase.functions.invoke('send-welcome-email', { body: { email: userEmail } });
        } catch (_) {}
      }
    } catch (_) {
      toast.error(t('landing.beta.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wasteland-root selection:bg-toxic-green selection:text-black">
      <StructuredData />

      {/* Atmospheric overlays */}
      <WastelandAudio />

      {/* Navigation */}
      <WastelandNavbar />

      {/* Main content */}
      <main className="bg-wasteland-bg">
        <HeroSection />
        <TheCoreLoopSection />
        <BoardGameMapSection />
        <TheManifestoSection />
        <ImpactPanelSection />
        <AddLootSection />
        <FaqSection />
        <FinalCtaSection
          email={email}
          loading={loading}
          onEmailChange={setEmail}
          onSubmit={handleWaitlistSubmit}
        />
        <SocialFooter t={t} />
      </main>

      {/* Spacing for fixed ticker */}
      <div className="h-10 bg-rust" />
      <WastelandTicker />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 right-6 z-50 px-4 py-3 rounded-xl hover:scale-105 transition-all bg-toxic-green !text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]"
        aria-label="Go to top"
      >
        <ArrowUp className="h-5 w-5" style={{ color: '#000', stroke: '#000' }} />
      </button>
    </div>
  );
}