import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { StructuredData } from '@/components/StructuredData';

// Wasteland components
import { DustParticles, BackgroundRadar, ScreenStatic, WastelandAudio } from '@/components/wasteland/WastelandEffects';
import { WastelandNavbar, WastelandTicker } from '@/components/wasteland/WastelandNav';
import { HeroSection, TheProblemSection, HowItWorksSection, NearbyDiscoveriesSection } from '@/components/wasteland/WastelandSections';
import { BoardGameMapSection } from '@/components/wasteland/WastelandMap';
import { WastelandBlogSection } from '@/components/wasteland/WastelandBlog';
import { ImpactPanelSection, FinalCtaSection, SocialFooter } from '@/components/wasteland/WastelandImpact';

const emailSchema = z.string().email();

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover_image_url: string | null;
}

export default function LandingPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, description, cover_image_url')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      setBlogPosts(data || []);
    })();
  }, []);

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
      <ScreenStatic />
      <div className="crt-overlay animate-flicker" />
      <div className="noise-overlay" />
      <div className="scan-line" />
      <DustParticles />
      <BackgroundRadar />

      {/* Navigation */}
      <WastelandNavbar />

      {/* Main content */}
      <main className="bg-wasteland-bg">
        <HeroSection />
        <TheProblemSection />
        <HowItWorksSection />
        <NearbyDiscoveriesSection />
        <BoardGameMapSection />
        <WastelandBlogSection posts={blogPosts} />
        <ImpactPanelSection />
        <FinalCtaSection
          email={email}
          loading={loading}
          onEmailChange={setEmail}
          onSubmit={handleWaitlistSubmit}
        />
        <SocialFooter t={t} />
      </main>

      {/* Spacing for fixed ticker */}
      <div className="h-10 bg-black" />
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