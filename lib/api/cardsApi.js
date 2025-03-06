import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // Regular query with manual pagination
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
      // Always refetch when using getNextPageArg to get more data
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      // Provide tags for cache invalidation if needed
      providesTags: ['Cards']
    }),
    
    // Alternative approach for anime cards (still using regular query)
    getAnimeCards: builder.query({
      query: ({ page = 0, limit = 10 }) => ({
        url: '/api/anime-cards',
        params: { page, limit }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Custom merge function to simulate infiniteQuery behavior
      merge: (currentCache, newItems) => {
        // First page
        if (!currentCache) {
          return {
            ...newItems,
            pages: [newItems]
          }
        }
        
        // Subsequent pages - maintain a pages array to simulate infiniteQuery
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
          pages: [...(currentCache.pages || []), newItems]
        }
      },
      // Always refetch when using a different page
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      // Provide tags for cache invalidation if needed
      providesTags: ['AnimeCards']
    })
  })
})

export const { useGetCardsQuery, useGetAnimeCardsQuery } = cardsApi