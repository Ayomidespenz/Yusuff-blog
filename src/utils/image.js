export function getImageUrl(image) {
  if (!image) return '/placeholder.jpg'
  if (image.startsWith('http')) return image
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  return `${apiUrl}/storage/${image}`
}
