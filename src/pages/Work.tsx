import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { siteImages } from '../lib/images';
import { sectionReveal } from '../lib/motion';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

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
      data-page="work"
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
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {projects.map((proj) => (
            <motion.div
              key={proj.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:scale-[1.02] cursor-pointer break-inside-avoid mb-6"
            >
              <img src={proj.img} alt={proj.title} className={cn('w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700', proj.aspect)} />
              <motion.div
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black/30 flex items-end p-4 z-10"
              >
                <div className="w-full">
                  <p className="text-primary font-headline text-xs tracking-widest uppercase mb-2">{proj.cat}</p>
                  <h3 className="text-2xl font-headline font-bold text-white leading-tight">{proj.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
