'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Photo } from '@/lib/photos';

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 px-6 md:px-10 pb-24">
      {photos.map((photo, i) => (
        <motion.figure
          key={photo.id}
          className="mb-5 break-inside-avoid relative overflow-hidden rounded-sm group"
          style={{ border: '1px solid var(--line)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className={`relative w-full ${photo.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-signature group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)' }}
            >
              <figcaption className="font-mono text-xs uppercase tracking-widest text-white">
                {photo.location}
              </figcaption>
            </div>
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
