interface PageBannerProps {
  tagline: string;
}

export function PageBanner({ tagline }: PageBannerProps) {
  return (
    <div className="page-banner" tabIndex={0}>
      <div className="page-banner__inner">
        <span className="page-banner__item">{tagline}</span>
      </div>
    </div>
  );
}
