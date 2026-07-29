export function isMobileView(userAgent: string, width: number): boolean {
  return /iPhone|iPad|iPod|Android/i.test(userAgent) || width < 768;
}
