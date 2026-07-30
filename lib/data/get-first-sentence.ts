export function getFirstSentence(bio: string): string {
  const index = bio.indexOf('.');
  if (index === -1) return bio;
  return bio.slice(0, index + 1);
}
