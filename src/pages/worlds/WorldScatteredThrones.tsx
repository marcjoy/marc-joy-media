import { WorldPageLayout, WorldSection } from '@/components/worlds/WorldPageLayout';

export default function WorldScatteredThrones() {
  return (
    <WorldPageLayout
      heroPlaceholderLabel="[Hero Image: Scattered Thrones — Documentary Frame]"
      title="Scattered Thrones"
      subhead="Recovering the record. One throne at a time."
      statusCategory="FILM"
      statusState="IN PRODUCTION"
    >
      <WorldSection title="The Series">
        <p>
          Scattered Thrones is a documentary and narrative film series dedicated to recovering historically erased and
          understated figures from the African diaspora and Pacific Northwest Black history. Each episode reconstructs
          a story that should have been common knowledge.
        </p>
      </WorldSection>

      <WorldSection title="Episode 01">
        <h3 className="!mb-2 font-headline text-xl font-bold text-on-surface">Abram Petrovich Gannibal</h3>
        <p>
          The African general who became the great-grandfather of Alexander Pushkin. Enslaved as a child, brought to the
          Russian court of Peter the Great, and rose to become one of the most powerful military engineers in Russian
          imperial history. His story was buried under Pushkin&apos;s fame. We dig it back up.
        </p>
      </WorldSection>

      <WorldSection title="The Method">
        <p>
          Primary source research. Archival imagery. Narrative re-enactment. Original score. Each episode is built as
          both documentary record and cinematic experience.
        </p>
      </WorldSection>
    </WorldPageLayout>
  );
}
