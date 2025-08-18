export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '/placeholder.jpg'
  if (imageUrl.startsWith('http')) return imageUrl
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  return `${apiUrl}/storage/${imageUrl}`
}
