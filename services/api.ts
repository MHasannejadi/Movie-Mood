import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const userApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
// baseQuery: async (baseUrl, prepareHeaders, ...rest) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/${baseUrl}`, rest)
//   return {data: await response.json()}
// },
// endpoints: (builder) => ({
// addToWatchList: builder.mutation({}),
// }),
// });

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (key) =>
        `discover/movie/?api_key=${key}&sort_by=popularity.desc&adult=false`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = movieApi;
