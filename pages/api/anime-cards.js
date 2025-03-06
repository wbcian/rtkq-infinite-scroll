// API endpoint for anime-style cards
export default function handler(req, res) {
  const page = parseInt(req.query.page || '0')
  const limit = parseInt(req.query.limit || '10')
  
  const animeTypes = [
    'Shonen', 'Shojo', 'Seinen', 'Josei', 'Isekai', 
    'Mecha', 'Fantasy', 'Slice of Life', 'Romance', 'Horror'
  ]
  
  const animeNames = [
    'Dragon Crystal', 'Magical Academy', 'Robot Fighters', 'Love Triangle',
    'Spirit Guardian', 'Samurai Quest', 'Ninja Legacy', 'Dark Voyage',
    'Space Adventurers', 'Fantasy Kingdom', "Hero's Journey", 'Mystic Magic',
    'School Days', 'Demon Hunter', 'Future Tech', 'Lost Memories'
  ]
  
  // Generate anime-style mock data
  const data = Array.from({ length: limit }, (_, i) => {
    const id = page * limit + i + 1
    const animeType = animeTypes[Math.floor(Math.random() * animeTypes.length)]
    const title = `${animeNames[Math.floor(Math.random() * animeNames.length)]} ${id}`
    
    return {
      id,
      title,
      description: `${animeType} anime about ${title.toLowerCase()}`,
      animeType,
      episodes: Math.floor(Math.random() * 24) + 1,
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
      releaseYear: 2010 + Math.floor(Math.random() * 14), // Years between 2010-2024
      imageUrl: `https://picsum.photos/seed/anime-${id}/300/400`
    }
  })
  
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json({
      data,
      nextPage: page + 1,
      hasMore: page < 5 // Limit to 5 pages for demo
    })
  }, 500)
}