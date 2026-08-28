import React from 'react';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';

interface GalleryPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
}

export const SocialGallery: React.FC = () => {
  const posts: GalleryPost[] = [
    {
      id: 'post-1',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      caption: 'Quiet moments in the Liquid Satin Column. Captured in Milan.',
      likes: '2.4k',
    },
    {
      id: 'post-2',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      caption: 'The 001 Structured Top-Handle in Tuscan Tan.',
      likes: '3.1k',
    },
    {
      id: 'post-3',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      caption: 'Architectural lines. Sartorial Hourglass Blazer on the streets of Paris.',
      likes: '1.9k',
    },
    {
      id: 'post-4',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      caption: 'Heavy 18k Vermeil Collar layered over fine knitwear.',
      likes: '4.2k',
    },
    {
      id: 'post-5',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      caption: 'Evening dusk in Saint-Germain. Runway 001 preview.',
      likes: '2.8k',
    },
    {
      id: 'post-6',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      caption: 'Atmosphere No. 001. Santal & Smoked Cardamom in stoneware.',
      likes: '1.5k',
    },
  ];

  return (
    <section id="social-gallery-section" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D] mb-2">
            <Instagram className="w-4 h-4" />
            <span>@NICODEMUS001</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-normal">
            FOLLOW THE NICODEMUS 001 WORLD
          </h2>
          <p className="text-xs text-[#7D7771] mt-2">
            A window into our ateliers, editorial campaigns, styling journals, and the women who inhabit our world.
          </p>
        </div>

        {/* 6 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-sm bg-[#181716] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#141312]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-[#FAF8F5]">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#C29E74]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#FAF8F5] line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#C29E74] mt-2">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
