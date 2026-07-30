import { describe, expect, it } from 'vitest';
import { getInitials } from './get-initials';

describe('getInitials', () => {
  it('takes the first letter of the first and last word for a two-word name', () => {
    expect(getInitials('Queen Hurry')).toBe('QH');
  });

  it('treats a hyphenated surname as one word', () => {
    expect(getInitials('Paulissen Owusu-Ansah')).toBe('PO');
  });

  it('returns just one letter for a single-word name', () => {
    expect(getInitials('Cher')).toBe('C');
  });

  it('handles a three-word name by using the first and last words only', () => {
    expect(getInitials('Anja Marie Bell')).toBe('AB');
  });
});
