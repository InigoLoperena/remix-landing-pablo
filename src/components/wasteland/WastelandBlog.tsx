import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from './WastelandNav';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover_image_url: string | null;
}

export const WastelandBlogSection = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) return null;
  return (
    <section className="py-24 bg-parchment/40 border-b-4 border-rust">
      <div className="container mx-auto px-10">
        <SectionHeading
          badge="INTEL_CORE"
          title="SCAVENGER DISPATCH"
          subtitle="Field reports and survival guides for the modern urban explorer."
        />
        <div className="grid md:grid-cols-3 gap-12">
          {posts.map(post => {
            const isExternal = post.slug.startsWith('http');
            const Wrapper = isExternal ? 'a' : Link;
            const linkProps = isExternal 
              ? { href: post.slug, target: '_blank', rel: 'noopener noreferrer' }
              : { to: `/blog/${post.slug}` };

            return (
              <Wrapper
                key={post.id}
                {...linkProps as any}
                className="bg-parchment scrap-border p-0 pixel-shadow group cursor-pointer hover:bg-rust/5 transition-colors overflow-hidden block"
              >
                {post.cover_image_url ? (
                  <div className="h-48 overflow-hidden border-b-4 border-rust">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-95 group-hover:brightness-110 transition-all duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-rust/10 border-b-4 border-rust flex items-center justify-center">
                    <span className="text-rust/30 font-mono-vt font-black tracking-widest uppercase">NO_IMAGE_DATA</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[12px] font-mono-vt font-bold text-parchment bg-rust px-2 py-1 uppercase">FIELD_REPORT</span>
                    <ArrowRight size={16} className="text-toxic-green group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-3xl font-crimson text-rust mb-4 tracking-widest group-hover:text-toxic-green transition-colors leading-tight">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-dust font-mono-vt text-sm mb-4 opacity-90 italic leading-relaxed line-clamp-3">
                      "{post.description}"
                    </p>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-block border-4 border-rust text-rust bg-hazard-yellow px-8 py-3 font-mono-vt font-black uppercase tracking-widest hover:bg-toxic-green shadow-[6px_6px_0px_#3d2616] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            ACCESS_ALL_ARCHIVES
          </Link>
        </div>
      </div>
    </section>
  );
};
