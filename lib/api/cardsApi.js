import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    // Regular query with manual pagination
    getCards: builder.query({
      query: ({ page = 0, limit = 10 }) => ({
        url: "/api/cards",
        params: { page, limit }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Merge incoming data with existing data for infinite scroll
      merge: (currentCache, newItems) => {
        if (currentCache) {
          return {
            ...newItems,
            data: [...currentCache.data, ...newItems.data]
          };
        }
        return newItems;
      },
      // Always refetch when using getNextPageArg to get more data
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // Provide tags for cache invalidation if needed
      providesTags: ["Cards"]
    }),

    // Using infiniteQuery for anime cards
    getAnimeCards: builder.infiniteQuery({
      query: ({ queryArg, pageParam = 0 }) => ({
        url: "/api/anime-cards",
        params: { page: pageParam, limit: 10 }
      }),
      // We don't need to transform the response for infinite queries
      // RTK Query will handle the structure automatically
      // Leave the original response structure intact so getNextPageParam can access hasMore

      // Configure infinite query behavior
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          return lastPage.hasMore ? lastPageParam + 1 : undefined;
        }
      },
      // Provide tags for cache invalidation if needed
      providesTags: ["AnimeCards"]
    })
  })
});

export const { useGetCardsQuery, useGetAnimeCardsInfiniteQuery } = cardsApi;
