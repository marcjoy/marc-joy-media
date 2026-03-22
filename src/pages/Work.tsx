import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

const projectAspects = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]', 'aspect-[4/5]'] as const;

const projects = siteImages.workItems.map((item, i) => ({
  title: item.title,
  cat: item.cat,
  img: item.img,
  aspect: projectAspects[i % projectAspects.length],
}));

export default function Work() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-32 px-8 max-w-[1440px] mx-auto"
    >
      <motion.section
        className="mb-20"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <h1 className="text-[80px] md:text-[120px] font-headline font-bold tracking-tighter text-on-surface leading-none mb-12">
          Work
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          {['All', 'Branding', 'Web', 'Content', 'Film'].map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={cn(
                'px-6 py-2 rounded-full font-headline font-bold text-sm uppercase transition-all',
                i === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface-variant hover:text-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          {projects.map((proj) => (
            <motion.div
              key={proj.title}
              variants={staggerCardVariants}
              className="group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:scale-[1.02] cursor-pointer break-inside-avoid mb-6"
            >
              <img src={proj.img} alt={proj.title} className={cn('w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700', proj.aspect)} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-primary font-headline text-xs tracking-widest uppercase mb-2">{proj.cat}</p>
                <h3 className="text-2xl font-headline font-bold text-white leading-tight">{proj.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
