import { motion } from 'motion/react';
import { WorldPageLayout, WorldSection } from '@/components/worlds/WorldPageLayout';
import { staggerCardVariants, staggerContainerVariants, staggerViewport } from '@/lib/motion';

const departments = [
  {
    title: 'Grounds Department',
    body: 'A living forest floor. Cubicles grown from trees. Employees: druids, moss spirits, landscape architects arguing about irrigation spells.',
  },
  {
    title: 'Pipe Fitters',
    body: 'Full steampunk environment. Steam clouds, brass pipes, goblin mechanics, mechanical salamanders living inside boilers.',
  },
  {
    title: 'HR',
    body: 'A liminal white void. Calm voices. Beings that sense emotions regulating interdimensional workplace conflicts.',
  },
  {
    title: 'Accounting',
    body: 'A desert of endless cubicles. Numbers float in the air like spirits. They track the energy cost of every dimension.',
  },
  {
    title: 'Legal',
    body: 'A gothic library. Ancient contracts written by cosmic entities. Books circling overhead like birds.',
  },
  {
    title: 'Shipping & Logistics',
    body: 'Chaos. Massive warehouse portals. Centaur forklift operators. Packages moving through unstable corridors.',
  },
] as const;

export default function WorldTheDepartment() {
  return (
    <WorldPageLayout
      heroPlaceholderLabel="[Hero Image: The Department Building Exterior]"
      title="The Department"
      subhead="Everyone calls IT. Nobody knows what IT actually sees."
      statusCategory="SERIES"
      statusState="IN DEVELOPMENT"
    >
      <WorldSection title="The Premise">
        <p>
          The Department is a workplace comedy series set inside an impossibly large corporate headquarters. From the
          outside the building looks like any office tower. Inside it is a stack of pocket dimensions, each one shaped
          by the work that department performs. The only person who moves between all of them is the IT support
          technician. Every dimension runs on the same network. When something breaks, they call IT.
        </p>
      </WorldSection>

      <WorldSection title="The World">
        <h3 className="!mb-2 font-headline text-xl font-bold text-on-surface">The Building</h3>
        <p>
          Each floor is a portal. Step through a department door and the physics of the space change. The elevators and
          stairwells are neutral zones where reality stabilizes. That is where two completely different worlds collide in
          the hallway and nobody reacts. Corporate normal.
        </p>
      </WorldSection>

      <WorldSection title="Example Departments">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          {departments.map((d) => (
            <motion.div
              key={d.title}
              variants={staggerCardVariants}
              className="rounded-lg border border-white/5 bg-surface-container p-5"
            >
              <h4 className="mb-2 font-headline text-lg font-bold text-on-surface">{d.title}</h4>
              <p className="text-sm leading-relaxed text-on-surface-variant">{d.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </WorldSection>

      <WorldSection title="The Protagonist">
        <p>
          The IT tech starts the job thinking it is a normal corporate support role. Day one their first ticket is in
          Grounds. They open the door and step into a forest. That is the moment the show hooks. Cynical. Competent.
          Socially awkward. Adaptable. After a while they talk to mythical creatures the same way they talk to
          coworkers. &ldquo;Did you try turning the spell matrix off and back on.&rdquo;
        </p>
      </WorldSection>

      <WorldSection title="Episode Format">
        <p>
          Each episode starts with a helpdesk ticket. The IT tech travels to the department to fix it. Something
          escalates. They solve it with logic instead of magic. That contrast is the whole joke.
        </p>
      </WorldSection>
    </WorldPageLayout>
  );
}
