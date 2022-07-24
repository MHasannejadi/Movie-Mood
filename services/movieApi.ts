import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (key) =>
        `discover/movie/?api_key=${key}&sort_by=popularity.desc&adult=false`,
    }),
    getMovie: builder.query({
      query: (data) => `movie/${data.id}?api_key=${data.key}`,
    }),
    getMovieCredits: builder.query({
      query: (data) => `movie/${data.id}/credits?api_key=${data.key}`,
    }),
    search: builder.query({
      query: (data) =>
        `search/movie?api_key=${data.key}&query=${data.query}&language=en-US&page=1&include_adult=false`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieQuery, useSearchQuery, useGetMovieCreditsQuery } =
  movieApi;
