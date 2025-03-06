// This is a backup API endpoint that will be used if MSW fails
export default function handler(req, res) {
  const page = parseInt(req.query.page || '0')
  const limit = parseInt(req.query.limit || '10')
  
  // Generate mock data
  const data = Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    title: `Card ${page * limit + i + 1}`,
    description: `This is the description for card ${page * limit + i + 1}`,
    imageUrl: `https://picsum.photos/seed/${page * limit + i + 1}/300/200`
  }))
  
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json({
      data,
      nextPage: page + 1,
      hasMore: page < 5 // Limit to 5 pages for demo
    })
  }, 500)
}