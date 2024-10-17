export function formatISOToDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
