export function formatEventDate(date: string): string {
  if (date.startsWith('TBA')) return date;
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
