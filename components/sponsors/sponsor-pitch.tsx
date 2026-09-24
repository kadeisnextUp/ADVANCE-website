const VALUE_PROPS = [
  {
    title: 'Talent Pipeline',
    body: 'Connect with career-focused University of Cincinnati students before they hit the job market. ADVANCE members are actively building the professional skills employers look for.',
  },
  {
    title: 'Event Visibility',
    body: "Get in front of students at ADVANCE's signature Corporate Excursion, networking receptions, and professional development workshops throughout the year.",
  },
  {
    title: 'Proven Track Record',
    body: 'Founded in 1986 and still going strong, ADVANCE earned the Chevron Award from the National Association of Colleges and Employers (NACE) for its work preparing students for the workforce.',
  },
  {
    title: 'Direct Impact',
    body: 'Sponsorship funds the workshops and events that directly shape University of Cincinnati students into the next generation of professionals.',
  },
];

export function SponsorPitch() {
  return (
    <section aria-labelledby="sponsor-pitch-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-pitch-heading" className="mb-6 text-2xl font-bold text-primary">
        Why Sponsor ADVANCE
      </h2>
      <div className="divide-y divide-primary/25 border-y border-primary/25">
        {VALUE_PROPS.map((prop) => (
          <div
            key={prop.title}
            className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[minmax(0,280px)_1fr] sm:gap-10"
          >
            <h3 className="text-lg font-bold text-primary sm:text-xl">{prop.title}</h3>
            <p className="text-foreground/80 sm:self-center">{prop.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}