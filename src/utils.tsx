export function formatISOToDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatISOTo12HourTime(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return `${hours}:${formattedMinutes} ${amPm}`;
  } else {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return `${formattedDate}, ${hours}:${formattedMinutes} ${amPm}`;
  }
}

