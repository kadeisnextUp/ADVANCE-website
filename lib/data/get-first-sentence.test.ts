import { describe, expect, it } from 'vitest';
import { getFirstSentence } from './get-first-sentence';

describe('getFirstSentence', () => {
  it('returns the substring up to and including the first period', () => {
    const bio = 'The President leads ADVANCE. They also do other things.';
    expect(getFirstSentence(bio)).toBe('The President leads ADVANCE.');
  });

  it('returns the full string unchanged when there is no period', () => {
    const bio = 'No punctuation here';
    expect(getFirstSentence(bio)).toBe('No punctuation here');
  });
});
