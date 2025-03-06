# RTK Query Infinite Scroll Example

This is a demo project showcasing two approaches to infinite scrolling with RTK Query, Next.js, and styled-components.

## Features

- Two different implementations of infinite scrolling:
  1. **Standard approach** - Using basic `merge` logic with RTK Query's `builder.query`
  2. **Alternative approach** - Using a more advanced merge strategy with anime-style cards
- Responsive card grid layouts with styled-components
- Mock API using MSW (Mock Service Worker)
- Loading indicators and error handling
- Tab interface to compare both implementations

## Tech Stack

- Next.js
- Redux Toolkit Query (RTK Query)
- styled-components
- MSW (Mock Service Worker)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Initialize MSW:
   ```bash
   npx msw init public
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

### Standard Approach (Regular Cards)

This approach uses RTK Query's standard `builder.query` with custom merge logic:

```jsx
getCards: builder.query({
  query: ({ page = 0, limit = 10 }) => ({
    url: '/api/cards',
    params: { page, limit }
  }),
  serializeQueryArgs: ({ endpointName }) => {
    return endpointName
  },
  // Merge incoming data with existing data for infinite scroll
  merge: (currentCache, newItems) => {
    if (currentCache) {
      return {
        ...newItems,
        data: [...currentCache.data, ...newItems.data]
      }
    }
    return newItems
  },
  forceRefetch({ currentArg, previousArg }) {
    return currentArg !== previousArg
  }
})
```

- Uses `useState` to track the current page number
- IntersectionObserver triggers page number updates
- Manual merging of response data

### Alternative Approach (Anime Cards)

This approach uses RTK Query's standard query but with a more advanced merge strategy:

```jsx
getAnimeCards: builder.query({
  query: ({ page = 0, limit = 10 }) => ({
    url: '/api/anime-cards',
    params: { page, limit }
  }),
  // Custom merge function to simulate pages array
  merge: (currentCache, newItems) => {
    // First page
    if (!currentCache) {
      return {
        ...newItems,
        pages: [newItems]
      }
    }
    
    // Subsequent pages - maintain a pages array
    return {
      ...newItems,
      data: [...currentCache.data, ...newItems.data],
      pages: [...(currentCache.pages || []), newItems]
    }
  }
})
```

- Maintains a custom pages array in the cache
- Uses manual page tracking with useState
- Features a visually distinct anime card design
- Shows how the same pattern can be adapted for different UIs

## Project Structure

- `/components` - React components including both card implementations
  - `Card.js` & `CardList.js` - Regular card implementation
  - `AnimeCard.js` & `AnimeCardList.js` - Anime-style card implementation using infiniteQuery
  - `TabContainer.js` - Tab interface for switching between implementations
- `/lib/api` - API services, Redux store, and MSW configuration
- `/pages` - Next.js pages and API endpoints
  - `/api/cards.js` - Regular cards API
  - `/api/anime-cards.js` - Anime cards API