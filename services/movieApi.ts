import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (data) => {
        return {
          url: "discover/movie?sort_by=popularity.desc&adult=false",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getMovie: builder.query({
      query: (data) => {
        return {
          url: `movie/${data.id}`,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getMovieCredits: builder.query({
      query: (data) => {
        return {
          url: `movie/${data.id}/credits`,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    search: builder.query({
      query: (data) => {
        return {
          url: `search/movie?query=${data.query}&language=en-US&page=1&include_adult=false`,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieQuery,
  useSearchQuery,
  useGetMovieCreditsQuery,
} = movieApi;
