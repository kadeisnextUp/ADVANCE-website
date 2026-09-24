import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'What benefits do sponsors receive?',
    answer:
      'Visibility on our site and materials, direct access to career-focused UC students, and opportunities to speak at events, host workshops, or take part in our signature Corporate Excursion.',
  },
  {
    question: 'How long does a sponsorship term last?',
    answer: 'Most partnerships run for an academic year, with options to renew or expand involvement.',
  },
  {
    question: 'Do you have any current sponsors?',
    answer:
      "Not yet — you'd be joining us at the very start of our sponsorship program for the 2026-2027 academic year. Early partners get first visibility as our roster grows.",
  },
  {
    question: 'How do we get started?',
    answer: "Email us and we'll set up a quick call to learn your goals and how we can work together.",
  },
];

export function SponsorFaq() {
  return (
    <section aria-labelledby="sponsor-faq-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-faq-heading" className="mb-6 text-2xl font-bold text-primary">
        Sponsorship FAQ
      </h2>
      <div className="divide-y divide-primary/25 border-y border-primary/25">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 max-w-2xl text-foreground/80">{item.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-foreground/80">
        Still have questions?{' '}
        <a
          href="mailto:advanceboard@gmail.com"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Email us directly
        </a>{' '}
        — advanceboard@gmail.com
      </p>
    </section>
  );
}