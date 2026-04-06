export const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  
  // Ensure the path starts with a slash
  const path = url.startsWith('/') ? url : `/${url}`;
  
  // Encode the URI to handle spaces and special characters
  return encodeURI(path);
};
