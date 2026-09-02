'use client';

import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { MapPin } from 'lucide-react';

type StickyScrollProps = {
  title: string;
  accent: string;
  intro: string;
  locationLabel: string;
};

type GalleryItem =
  | { kind: 'image'; src: string }
  | { kind: 'instagram'; src: string; title: string };

const leftImages = [
  { kind: 'image', src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&auto=format&fit=crop&q=82' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=82' },
  { kind: 'instagram', src: 'https://www.instagram.com/consulpecpy/reel/DRfHg4ZkREx/embed/', title: 'Video de campo de Consulpec' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1598958944683-b5e33434cb89?w=1000&auto=format&fit=crop&q=82' },
  { kind: 'instagram', src: 'https://www.instagram.com/consulpecpy/reel/DIHd66uxwoE/embed/', title: 'Proyecto en campo de Consulpec' },
] satisfies GalleryItem[];

const centerImages = [
  { kind: 'image', src: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1000&auto=format&fit=crop&q=86' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=86' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&auto=format&fit=crop&q=86' },
] satisfies GalleryItem[];

const rightImages = [
  { kind: 'image', src: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1000&auto=format&fit=crop&q=82' },
  { kind: 'instagram', src: 'https://www.instagram.com/consulpecpy/reel/DbCWDsvOvjL/embed/', title: 'Reel de Consulpec Paraguay' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1000&auto=format&fit=crop&q=82' },
  { kind: 'instagram', src: 'https://www.instagram.com/consulpecpy/p/DcwapgSqPBL/embed/', title: 'Fotografía de Consulpec Paraguay' },
  { kind: 'image', src: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1000&auto=format&fit=crop&q=82' },
] satisfies GalleryItem[];

const GalleryImage = ({ item, index, className }: { item: GalleryItem; index: number; className?: string }) => (
  <figure className={`group relative w-full overflow-hidden bg-[#18392f] ${className ?? ''}`}>
    {item.kind === 'instagram' ? (
      <iframe className="h-full w-full border-0 bg-white" src={item.src} title={item.title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" />
    ) : (
      <>
        <img src={item.src} alt={`Trabajo rural y producción de campo ${index + 1}`} className="h-full w-full object-cover saturate-[.82] transition-all duration-700 group-hover:scale-[1.035] group-hover:saturate-100" loading={index > 2 ? 'lazy' : 'eager'} />
        <span className="absolute inset-0 bg-gradient-to-t from-[#071e18]/45 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-white/90"><MapPin className="size-3 text-[#a8e84a]" /> Paraguay · 0{index + 1}</span>
      </>
    )}
  </figure>
);

const StickyScroll = forwardRef<HTMLElement, StickyScrollProps>(
  ({ title, accent, intro, locationLabel }, ref) => {
    return (
      <ReactLenis root>
        <section ref={ref} className="bg-[#071e18] text-white">
          <div className="relative grid min-h-[88vh] place-content-center overflow-hidden px-5 py-24 text-center md:sticky md:top-0 md:h-screen">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#a8e84a12_1px,transparent_1px),linear-gradient(to_bottom,#a8e84a12_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_68%,transparent_100%)]" />
            <div className="relative z-10 mx-auto max-w-5xl">
              <h2 className="text-balance text-[clamp(3rem,8vw,7.4rem)] font-semibold leading-[.9] tracking-[-.065em]">
                {title}<br />
                <em className="font-serif font-normal text-[#79a83d]">{accent}</em>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl font-serif text-base leading-relaxed text-white/60 md:text-xl">{intro}</p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-1 bg-[#071e18] p-1 md:grid-cols-12 md:gap-2 md:p-2">
            <div className="col-span-1 grid gap-1 md:col-span-4 md:gap-2">
              {leftImages.map((item, index) => <GalleryImage key={item.src} item={item} index={index} className="h-[46vh] min-h-72 rounded-sm md:h-[31rem]" />)}
            </div>

            <div className="col-span-1 grid h-fit gap-1 md:sticky md:top-0 md:col-span-4 md:h-screen md:grid-rows-3 md:gap-2">
              {centerImages.map((item, index) => <GalleryImage key={item.src} item={item} index={index + 5} className="h-[46vh] min-h-72 rounded-sm md:h-auto md:min-h-0" />)}
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-1 md:col-span-4 md:grid-cols-1 md:gap-2">
              {rightImages.map((item, index) => <GalleryImage key={item.src} item={item} index={index + 8} className="h-[38vh] min-h-64 rounded-sm md:h-[31rem]" />)}
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#071e18] px-4 pt-20 text-center">
            <p className="translate-y-[2.5vw] text-[15vw] font-semibold uppercase leading-none tracking-[-.08em] text-transparent [background:linear-gradient(90deg,#a8e84a,#365c4e)] [background-clip:text]">
              Consulpec
            </p>
            <div className="relative z-10 grid min-h-40 place-content-center rounded-t-[50%] bg-[#0d2a22] text-[10px] font-bold uppercase tracking-[.2em] text-white/50">
              {locationLabel}
            </div>
          </div>
        </section>
      </ReactLenis>
    );
  },
);

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
