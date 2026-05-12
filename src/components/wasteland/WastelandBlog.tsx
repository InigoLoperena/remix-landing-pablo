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
    <section className="py-24 bg-black/40 industrial-grid border-b-4 border-black">
      <div className="container mx-auto px-10">
        <SectionHeading
          badge="INTEL_CORE"
          title="SCAVENGER DISPATCH"
          subtitle="Field reports and survival guides for the modern urban explorer."
        />
        <div className="grid md:grid-cols-3 gap-12">
          {posts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-zinc-900/80 border-4 border-black p-0 scrap-border pixel-shadow group cursor-pointer hover:bg-zinc-800 transition-colors overflow-hidden block"
            >
              {post.cover_image_url ? (
                <div className="h-48 overflow-hidden border-b-2 border-black">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-zinc-800 border-b-2 border-black industrial-grid" />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-pixel text-rust uppercase">FIELD_REPORT</span>
                  <ArrowRight size={16} className="text-toxic-green group-hover:translate-x-2 transition-transform" />
                </div>
                <h3 className="text-2xl font-display text-white mb-4 tracking-widest group-hover:text-toxic-green transition-colors leading-tight">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-dust font-typewriter text-xs mb-4 opacity-70 italic leading-relaxed line-clamp-3">
                    "{post.description}"
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-block border-2 border-toxic-green text-toxic-green px-8 py-3 font-display font-black uppercase tracking-widest hover:bg-toxic-green/10 shadow-[4px_4px_0px_#000] transition-all"
          >
            ACCESS_ALL_ARCHIVES
          </Link>
        </div>
      </div>
    </section>
  );
};
