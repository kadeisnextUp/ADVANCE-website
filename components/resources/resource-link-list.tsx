import { ExternalLink } from 'lucide-react';
import type { ResourceLink } from '@/lib/data/resources';

interface ResourceLinkListProps {
  heading: string;
  intro?: string;
  links: ResourceLink[];
}

interface LinkGroup {
  category: string | null;
  links: ResourceLink[];
}

// Groups consecutive links sharing a category so callers can opt into
// subheadings by ordering/tagging their data, without a separate component
// path for the (common) fully-flat case.
function groupByCategory(links: ResourceLink[]): LinkGroup[] {
  const groups: LinkGroup[] = [];
  for (const link of links) {
    const category = link.category ?? null;
    const last = groups[groups.length - 1];
    if (last && last.category === category) {
      last.links.push(link);
    } else {
      groups.push({ category, links: [link] });
    }
  }
  return groups;
}

export function ResourceLinkList({ heading, intro, links }: ResourceLinkListProps) {
  const headingId = `resources-${heading.toLowerCase().replace(/\s+/g, '-')}-heading`;
  const groups = groupByCategory(links);

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-6xl px-6 py-8">
      <h2 id={headingId} className="mb-2 text-2xl font-bold text-primary">
        {heading}
      </h2>
      {intro && <p className="mb-4 text-foreground/80">{intro}</p>}
      {links.length === 0 ? (
        <p className="text-foreground/70">No resources listed yet.</p>
      ) : (
        <div className="space-y-6">
          {groups.map((group, index) => (
            <div key={group.category ?? `ungrouped-${index}`}>
              {group.category && (
                <h3 className="mb-2 text-xs font-semibold tracking-wide text-foreground/60 uppercase">
                  {group.category}
                </h3>
              )}
              <ul className="flex flex-wrap gap-2">
                {group.links.map((link) => {
                  const isExternal = link.external ?? true;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
                      >
                        {link.label}
                        {isExternal && (
                          <>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span className="sr-only"> (opens in new tab)</span>
                          </>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}