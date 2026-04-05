import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ElfsightAppointmentBooking } from '../components/ElfsightAppointmentBooking';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

type ClientProject = {
  label: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
};

const clients: ClientProject[] = [
  {
    label: 'CLIENT / NONPROFIT',
    name: 'Northwest Black Pioneers',
    description:
      "Digital presence, social content strategy, and historical narrative for Seattle's premier Black history organization. Ongoing.",
    url: 'https://northwestblackpioneers.com',
    tags: ['Content Strategy', 'Social Media', 'Web'],
    image: '/clients/northwest-black-pioneers-logo.png',
    imageAlt: 'Northwest Black Pioneers logo',
  },
  {
    label: 'CLIENT / EDUCATION',
    name: 'MARS Early Learning Academy',
    description:
      'Brand identity, weekly content series, and community engagement for a Seattle early learning center.',
    url: 'https://www.marsearlylearningacademy.org/',
    tags: ['Brand Identity', 'Content', 'Education'],
    image: '/clients/mars-early-learning-logo.png',
    imageAlt: 'MARS Early Learning Academy logo',
  },
  {
    label: 'CLIENT / NONPROFIT',
    name: 'Rainier Beach Community Resource Center',
    description:
      'Webflow site build and content architecture for a grant-funded community organization in Rainier Beach, Seattle.',
    url: 'https://www.rbcrc.org/',
    tags: ['Web Development', 'Webflow', 'Community'],
    image: '/clients/rainier-beach-crc-logo.png',
    imageAlt: 'Rainier Beach Community Resource Center logo',
  },
];

function ClientCard({ project }: { project: ClientProject }) {
  const hasLiveUrl = Boolean(project.url && project.url !== '#');
  const isPlaceholder = !hasLiveUrl;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-white/5 border-l-2 bg-zinc-900 [border-left-color:var(--page-accent)] md:flex-row md:items-stretch">
      {project.image ? (
        <div className="box-border flex h-[200px] w-full shrink-0 items-center justify-center border-b border-white/5 bg-white p-6 md:w-[280px] md:border-b-0 md:border-r md:border-white/5">
          <img
            src={project.image}
            alt={project.imageAlt ?? ''}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <p className="text-on-surface-variant font-headline text-[10px] font-normal uppercase tracking-[0.2em] md:text-xs">
            {project.label}
          </p>
          <h2 className="mt-2 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            {project.name}
          </h2>
        </div>
        <p className="text-on-surface-variant font-body text-base leading-relaxed">{project.description}</p>
        <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-wider text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
          {hasLiveUrl ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
            >
              Visit site
              <ExternalLink className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
            </a>
          ) : (
            <span className="inline-flex items-center font-headline text-sm font-bold uppercase tracking-widest text-primary opacity-50 cursor-not-allowed select-none">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <motion.div
      data-page="work"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      <div className="mx-auto max-w-3xl px-8 pt-48 md:max-w-4xl lg:max-w-5xl">
        <motion.section
          className="mb-16 md:mb-20"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <h1 className="mb-6 max-w-4xl font-headline text-5xl font-black leading-none tracking-tighter text-on-surface md:text-7xl md:text-[80px]">
            THE WORK
          </h1>
          <p className="mb-4 max-w-xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Client partnerships and studio services.
          </p>
          <p className="max-w-2xl font-body text-base leading-relaxed text-on-surface-variant/90 md:text-lg">
            Marc Joy Media partners with mission-driven organizations to build their digital presence, content strategy,
            and visual identity.
          </p>
        </motion.section>

        <motion.section
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            {clients.map((project) => (
              <motion.div key={project.name} variants={staggerCardVariants}>
                <ClientCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      <ElfsightAppointmentBooking />
    </motion.div>
  );
}
