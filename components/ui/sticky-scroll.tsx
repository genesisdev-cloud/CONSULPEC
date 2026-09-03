'use client';

import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';

type RequestCopy = {
  kicker: string;
  title: string;
  intro: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  servicePlaceholder: string;
  location: string;
  message: string;
  submit: string;
  optional: string;
};

type StickyScrollProps = {
  title: string;
  accent: string;
  intro: string;
  request: RequestCopy;
  services: readonly string[];
  whatsappNumber: string;
};

const leftImages = [
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1636150320841-82b350a92c54?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1598958944683-b5e33434cb89?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1645727527942-f12e14a0c841?w=1000&auto=format&fit=crop&q=82',
];

const centerImages = [
  'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1000&auto=format&fit=crop&q=86',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=86',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&auto=format&fit=crop&q=86',
];

const rightImages = [
  'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1713559667017-a847816d55cf?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1598958944683-b5e33434cb89?w=1000&auto=format&fit=crop&q=82',
  'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1000&auto=format&fit=crop&q=82',
];

const GalleryImage = ({ src, index, className }: { src: string; index: number; className?: string }) => (
  <figure className={`group relative w-full overflow-hidden bg-[#18392f] ${className ?? ''}`}>
    <img src={src} alt={`Trabajo rural y producción de campo ${index + 1}`} className="h-full w-full object-cover saturate-[.82] transition-all duration-700 group-hover:scale-[1.035] group-hover:saturate-100" loading={index > 2 ? 'lazy' : 'eager'} />
    <span className="absolute inset-0 bg-gradient-to-t from-[#071e18]/45 via-transparent to-transparent" />
    <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-white/90"><MapPin className="size-3 text-[#a8e84a]" /> Paraguay · 0{index + 1}</span>
  </figure>
);

const StickyScroll = forwardRef<HTMLElement, StickyScrollProps>(
  ({ title, accent, intro, request, services, whatsappNumber }, ref) => {
    const submitRequest = (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const value = (key: string) => {
        const field = data.get(key);
        return typeof field === 'string' ? field : '';
      };
      const lines = [
        'Hola Consulpec, quiero solicitar un servicio.',
        '',
        `Nombre: ${value('name')}`,
        `Teléfono: ${value('phone')}`,
        `Correo: ${value('email') || 'No indicado'}`,
        `Servicio: ${value('service')}`,
        `Ubicación: ${value('location')}`,
        `Necesidad: ${value('message')}`,
      ];
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
    };

    return (
      <ReactLenis root>
        <section ref={ref} className="gallery-scroll bg-[#071e18] text-white">
          <div className="gallery-stage relative grid min-h-[88vh] place-content-center overflow-hidden px-5 py-24 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#a8e84a12_1px,transparent_1px),linear-gradient(to_bottom,#a8e84a12_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_68%,transparent_100%)]" />
            <div className="relative z-10 mx-auto max-w-5xl">
              <h2 className="text-balance text-[clamp(3rem,8vw,7.4rem)] font-semibold leading-[.9] tracking-[-.065em]">
                {title}<br />
                <em className="font-serif font-normal text-[#79a83d]">{accent}</em>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl font-serif text-base leading-relaxed text-white/60 md:text-xl">{intro}</p>
            </div>
          </div>

          <div className="gallery-columns relative z-10 grid grid-cols-2 gap-1 bg-[#071e18] p-1 md:grid-cols-12 md:gap-2 md:p-2">
            <div className="col-span-1 grid gap-1 md:col-span-4 md:gap-2">
              {leftImages.map((src, index) => <GalleryImage key={src} src={src} index={index} className="h-[46vh] min-h-72 rounded-sm md:h-[31rem]" />)}
            </div>

            <div className="gallery-center col-span-1 grid h-fit gap-1 md:col-span-4 md:grid-rows-3 md:gap-2">
              {centerImages.map((src, index) => <GalleryImage key={src} src={src} index={index + 5} className="h-[46vh] min-h-72 rounded-sm md:h-auto md:min-h-0" />)}
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-1 md:col-span-4 md:grid-cols-1 md:gap-2">
              {rightImages.map((src, index) => <GalleryImage key={src} src={src} index={index + 8} className="h-[38vh] min-h-64 rounded-sm md:h-[31rem]" />)}
            </div>
          </div>

          <div className="request-section" id="solicitud">
            <div className="request-copy">
              <p>{request.kicker}</p>
              <h3>{request.title}</h3>
              <span>{request.intro}</span>
            </div>
            <form className="request-form" onSubmit={submitRequest}>
              <label><span>{request.name}</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>{request.phone}</span><input name="phone" type="tel" autoComplete="tel" required /></label>
              <label><span>{request.email} <small>{request.optional}</small></span><input name="email" type="email" autoComplete="email" /></label>
              <label><span>{request.service}</span><select name="service" defaultValue="" required><option value="" disabled>{request.servicePlaceholder}</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
              <label><span>{request.location}</span><input name="location" type="text" autoComplete="address-level1" required /></label>
              <label className="request-message"><span>{request.message}</span><textarea name="message" rows={4} required /></label>
              <button type="submit">{request.submit}<ArrowUpRight size={18}/></button>
            </form>
          </div>
        </section>
      </ReactLenis>
    );
  },
);

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
