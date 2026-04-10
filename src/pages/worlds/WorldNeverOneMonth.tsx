import { WorldPageLayout, WorldSection } from '@/components/worlds/WorldPageLayout';

export default function WorldNeverOneMonth() {
  return (
    <WorldPageLayout
      heroPlaceholderLabel="[Hero Image: NeverOneMonth / NileGen Platform]"
      title="NeverOneMonth / NileGen"
      subhead="365 days. Because Black history was never just one month."
      statusCategory="CULTURE"
      statusState="ACTIVE"
    >
      <WorldSection title="The Mission">
        <p>
          NeverOneMonth is a 365-day content pipeline built to surface Black history, culture, and futures every single
          day of the year. NileGen is the AI-powered engine underneath it — a Gemini-driven prompt and content
          generation system that produces posts, images, and captions across the full calendar.
        </p>
      </WorldSection>

      <WorldSection title="How It Works">
        <p>
          Each day pulls from a rotating calendar of historical figures, cultural moments, and speculative futures. Copy
          is generated via Gemini 2.5 Flash. Images are generated via Replicate and Flux AI. Content is scheduled through
          Publer and distributed across platforms.
        </p>
      </WorldSection>

      <WorldSection title="The Archive">
        <p>
          Every post is a document. Over time the pipeline becomes a living archive of Black cultural memory — one that
          grows every day and never repeats.
        </p>
      </WorldSection>
    </WorldPageLayout>
  );
}
