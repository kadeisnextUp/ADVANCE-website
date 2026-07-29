import { describe, expect, it } from 'vitest';
import { isMobileView } from './is-mobile-view';

describe('isMobileView', () => {
  it('returns true for a mobile user agent at a wide viewport width', () => {
    expect(isMobileView('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 1024)).toBe(true);
  });

  it('returns true for a desktop user agent at a narrow viewport width', () => {
    expect(isMobileView('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 500)).toBe(true);
  });

  it('returns false for a desktop user agent at a wide viewport width', () => {
    expect(isMobileView('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 1440)).toBe(false);
  });
});
