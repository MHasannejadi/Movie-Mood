import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actorApi = createApi({
  reducerPath: "actorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getActor: builder.query({
      query: (data) => {
        return {
          url: `credit/${data.id}`,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetActorQuery } = actorApi;
