export const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  
  // Get the base URL from Vite
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure the path starts with a slash if it doesn't already
  const path = url.startsWith('/') ? url.slice(1) : url;
  
  // Combine base URL and path, ensuring no double slashes
  const fullPath = baseUrl.endsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  
  // Encode the URI to handle spaces and special characters
  return encodeURI(fullPath);
};
