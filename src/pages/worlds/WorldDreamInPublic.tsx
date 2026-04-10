import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { WorldPageLayout, WorldSection } from '@/components/worlds/WorldPageLayout';
import { staggerCardVariants, staggerContainerVariants, staggerViewport } from '@/lib/motion';

const obsidianSections = [
  {
    label: 'WORLDS',
    body: 'Universe building, lore, and speculative culture',
  },
  {
    label: 'SIGNAL',
    body: 'Commentary, criticism, and cultural signal',
  },
  {
    label: 'ARCHIVE',
    body: 'Historical recovery, Scattered Thrones adjacent content',
  },
  {
    label: 'STUDIO',
    body: 'Behind the scenes, process, and craft',
  },
  {
    label: 'COMMUNITY',
    body: 'People, collaborators, and movement',
  },
] as const;

export default function WorldDreamInPublic() {
  return (
    <WorldPageLayout
      heroPlaceholderLabel="[Hero Image: Dream in Public Newsroom]"
      title="Dream in Public"
      subhead="We make imagination visible."
      statusCategory="MEDIA"
      statusState="ACTIVE"
    >
      <WorldSection title="What It Is">
        <p>
          Dream in Public is the media arm of Marc Joy Media. A public-facing newsroom, creative platform, and
          philosophy made into infrastructure. Built to document, distribute, and amplify the full creative ecosystem
          of MJM properties and the broader Afrofuturist cultural conversation.
        </p>
      </WorldSection>

      <WorldSection title="The Newsroom (The Obsidian Feed)">
        <p className="!mb-6">
          The Obsidian Feed is the central publication of Dream in Public. Five editorial sections cover the full MJM
          universe and beyond.
        </p>
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          {obsidianSections.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerCardVariants}
              className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-5"
            >
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-container">
                {s.label}
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="!mt-8">
          <Link
            to="/magazine"
            className="inline-flex min-h-11 items-center justify-center bg-primary-container px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110"
          >
            Go to the magazine
          </Link>
        </div>
      </WorldSection>

      <WorldSection title="The Philosophy">
        <p>
          We Dream in Public is not a tagline. It is a practice. Making the work visible while it is still becoming.
          Sharing the process, the world-building, the failures and the pivots. This is how the dream stays real.
        </p>
      </WorldSection>
    </WorldPageLayout>
  );
}
