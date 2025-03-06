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
      query: ({ page = 0, limit = 10 }) => ({
        url: "/api/anime-cards",
        params: { page, limit }
      }),
      // Transform the response to match the expected format for infinite queries
      transformResponse: (response, meta, arg) => {
        return {
          items: response.data,
          nextPage: response.nextPage,
          hasMore: response.hasMore
        };
      },
      // Define how to get the next page argument
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? lastPage.nextPage : undefined;
      },
      // Provide tags for cache invalidation if needed
      providesTags: ["AnimeCards"]
    })
  })
});

export const { useGetCardsQuery, useGetAnimeCardsInfiniteQuery } = cardsApi;
