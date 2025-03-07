import { NextApiRequest, NextApiResponse } from "next";

interface AnimeCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  studio: string;
  episodes: number;
  year: number;
}

interface AnimeCardsResponse {
  data: AnimeCard[];
  nextCursor: number | null;
  hasMore: boolean;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<AnimeCardsResponse>) {
  const cursor = parseInt((req.query.cursor as string) || "0");
  const limit = parseInt((req.query.limit as string) || "10");

  // Generate mock anime data
  const data = Array.from({ length: limit }, (_, i) => {
    const id = cursor + i + 1;
    return {
      id,
      title: `Anime Title ${id}`,
      description: `This is an anime about adventures and friendships. Episode ${id}`,
      imageUrl: `https://picsum.photos/seed/anime-${id}/300/450`,
      rating: Math.round((3 + Math.random() * 2) * 10) / 10, // Random rating between 3.0 and 5.0
      studio: ["Studio A", "Studio B", "Studio C", "Studio D"][Math.floor(Math.random() * 4)],
      episodes: Math.floor(Math.random() * 24) + 12, // Random episode count between 12 and 36
      year: Math.floor(Math.random() * 10) + 2010 // Random year between 2010 and 2020
    };
  });

  // Simulate a cursor-based pagination API
  setTimeout(() => {
    res.status(200).json({
      data,
      nextCursor: cursor + limit < 60 ? cursor + limit : null, // Limit to 60 items for demo
      hasMore: cursor + limit < 60 // hasMore flag
    });
  }, 800); // Slightly longer delay than the cards API
}
