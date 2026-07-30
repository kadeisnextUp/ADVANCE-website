import { Button } from '@/components/ui/button';

const FAQ_ITEMS = [
  {
    question: 'What benefits do sponsors receive?',
    answer:
      'Visibility on our site and materials, access to student talent pipelines, and opportunities to speak at events or host workshops.',
  },
  {
    question: 'How long does a sponsorship term last?',
    answer: 'Most partnerships run for an academic year, with options to renew or expand involvement.',
  },
  {
    question: 'How do we get started?',
    answer: "Email us and we'll share our sponsorship kit and a quick call time to learn your goals.",
  },
];

export function SponsorFaq() {
  return (
    <section aria-labelledby="sponsor-faq-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-faq-heading" className="mb-6 text-2xl font-bold text-primary">
        Sponsorship FAQ
      </h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="rounded-xl bg-background p-4 ring-1 ring-primary/15">
            <summary className="cursor-pointer font-semibold text-primary">{item.question}</summary>
            <p className="mt-2 text-sm text-foreground/80">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="mb-4 text-foreground/80">Interested in sponsoring ADVANCE?</p>
        <Button render={<a href="mailto:advanceboard@gmail.com" />} nativeButton={false} size="lg">
          Email Us
        </Button>
      </div>
    </section>
  );
}
