import { rest } from "msw";

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface AnimeCard {
  id: number;
  title: string;
  description: string;
  animeType: string;
  episodes: number;
  rating: string;
  releaseYear: number;
  imageUrl: string;
}

// Generate regular card mock data
const generateCards = (page: number, limit: number = 10): Card[] => {
  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    title: `Card ${page * limit + i + 1}`,
    description: `This is the description for card ${page * limit + i + 1}`,
    imageUrl: `https://picsum.photos/seed/${page * limit + i + 1}/300/200`
  }));
};

// Generate anime-style mock data
const generateAnimeCards = (page: number, limit: number = 10): AnimeCard[] => {
  const animeTypes = [
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Mecha",
    "Fantasy",
    "Slice of Life",
    "Romance",
    "Horror"
  ];

  const animeNames = [
    "Dragon Crystal",
    "Magical Academy",
    "Robot Fighters",
    "Love Triangle",
    "Spirit Guardian",
    "Samurai Quest",
    "Ninja Legacy",
    "Dark Voyage",
    "Space Adventurers",
    "Fantasy Kingdom",
    "Hero's Journey",
    "Mystic Magic",
    "School Days",
    "Demon Hunter",
    "Future Tech",
    "Lost Memories"
  ];

  return Array.from({ length: limit }, (_, i) => {
    const id = page * limit + i + 1;
    const animeType = animeTypes[Math.floor(Math.random() * animeTypes.length)];
    const title = `${animeNames[Math.floor(Math.random() * animeNames.length)]} ${id}`;

    return {
      id,
      title,
      description: `${animeType} anime about ${title.toLowerCase()}`,
      animeType,
      episodes: Math.floor(Math.random() * 24) + 1,
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
      releaseYear: 2010 + Math.floor(Math.random() * 14), // Years between 2010-2024
      imageUrl: `https://picsum.photos/seed/anime-${id}/300/400`
    };
  });
};

// Define handlers
export const handlers = [
  // Regular cards endpoint
  rest.get("/api/cards", (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "0");
    const limit = parseInt(req.url.searchParams.get("limit") || "10");

    const data = generateCards(page, limit);

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        data,
        nextPage: page + 1,
        hasMore: page < 5 // Limit to 5 pages for demo
      })
    );
  }),

  // Anime cards endpoint
  rest.get("/api/anime-cards", (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "0");
    const limit = parseInt(req.url.searchParams.get("limit") || "10");

    const data = generateAnimeCards(page, limit);

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        data,
        nextPage: page + 1,
        hasMore: page < 5 // Limit to 5 pages for demo
      })
    );
  })
];

// Setup MSW server for Node.js (used in tests or SSR)
export const setupServer = async () => {
  if (typeof window === "undefined") {
    const { setupServer } = await import("msw/node");
    return setupServer(...handlers);
  }
  return null;
};
