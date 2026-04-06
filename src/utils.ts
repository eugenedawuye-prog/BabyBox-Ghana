export const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return url;
  // If it's a relative path, assume it's from the root of the public directory
  return `/${url}`;
};
