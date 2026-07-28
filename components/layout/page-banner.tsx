interface PageBannerProps {
  tagline: string;
}

export function PageBanner({ tagline }: PageBannerProps) {
  return (
    <div className="page-banner" tabIndex={0} aria-label="Site announcement banner">
      <div className="page-banner__inner">
        <span className="page-banner__item">{tagline}</span>
      </div>
    </div>
  );
}
