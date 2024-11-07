function toRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  switch (true) {
    case diff < 60000:
      const sec = Math.floor(diff / 1000);
      return sec <= 1 ? `${sec} second ago` : `${sec} seconds ago`;
    case diff < 3600000:
      const min = Math.floor(diff / 60000);
      return min <= 1 ? `${min} minute ago` : `${min} minutes ago`;
    case diff < 86400000:
      const hour = Math.floor(diff / 3600000);
      return hour <= 1 ? `${hour} hour ago` : `${hour} hours ago`;
    case diff < 604800000:
      const day = Math.floor(diff / 86400000);
      return day <= 1 ? `${day} day ago` : `${day} days ago`;
    case diff < 2419200000:
      const week = Math.floor(diff / 604800000);
      return week <= 1 ? `${week} week ago` : `${week} weeks ago`;
    case diff < 29030400000:
      const month = Math.floor(diff / 2419200000);
      return month <= 1 ? `${month} month ago` : `${month} months ago`;
    default:
      const year = Math.floor(diff / 29030400000);
      return year <= 1 ? `${year} year ago` : `${year} years ago`;
  }
}

export { toRelativeTime };
