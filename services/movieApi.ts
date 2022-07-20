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
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieQuery } = movieApi;
