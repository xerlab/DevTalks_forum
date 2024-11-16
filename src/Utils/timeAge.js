export function timeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);

  const diffInMilliseconds = now - time;
  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} min ago`;
  }

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hour${
      Math.floor(diffInHours) !== 1 ? "s" : ""
    } ago`;
  }

  const day = time.getDate().toString().padStart(2, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const year = time.getFullYear();

  return `${year}-${month}-${day}`;
}
