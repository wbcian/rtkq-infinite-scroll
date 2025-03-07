import { NextApiRequest, NextApiResponse } from "next";

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CardsResponse {
  data: Card[];
  nextPage: number;
  hasMore: boolean;
}

// This is a backup API endpoint that will be used if MSW fails
export default function handler(req: NextApiRequest, res: NextApiResponse<CardsResponse>) {
  const page = parseInt((req.query.page as string) || "0");
  const limit = parseInt((req.query.limit as string) || "10");

  // Generate mock data
  const data = Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    title: `Card ${page * limit + i + 1}`,
    description: `This is the description for card ${page * limit + i + 1}`,
    imageUrl: `https://picsum.photos/seed/${page * limit + i + 1}/300/200`
  }));

  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json({
      data,
      nextPage: page + 1,
      hasMore: page < 5 // Limit to 5 pages for demo
    });
  }, 500);
}
