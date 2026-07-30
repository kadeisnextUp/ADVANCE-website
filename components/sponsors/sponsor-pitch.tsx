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
    body: 'Sponsorship funds scholarships, workshops, and events that directly shape the next generation of professionals in the Greater Cincinnati area.',
  },
];

export function SponsorPitch() {
  return (
    <section aria-labelledby="sponsor-pitch-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-pitch-heading" className="mb-6 text-2xl font-bold text-primary">
        Why Sponsor ADVANCE
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VALUE_PROPS.map((prop) => (
          <div key={prop.title} className="rounded-xl bg-background p-5 ring-1 ring-primary/15">
            <h3 className="mb-2 font-bold text-primary">{prop.title}</h3>
            <p className="text-sm text-foreground/80">{prop.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
