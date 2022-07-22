import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  key: string;
  username: string;
  password: string;
  request_token: string;
}
export interface LoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface GetSessionRequest {
  key: string;
  request_token: string;
}
export interface GetSessionResponse {
  success: boolean;
  session_id: string;
}

export interface AddToWatchListRequest {
  account_id: string;
  session_id: string;
  key: string;
  media_type: string;
  media_id: number;
  watchlist: boolean;
}
export interface AddToWatchListResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createToken: builder.query({
      query: (key) => `authentication/token/new?api_key=${key}`,
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `authentication/token/validate_with_login?api_key=${credentials.key}`,
        method: "POST",
        body: {
          request_token: credentials.request_token,
          username: credentials.username,
          password: credentials.password,
        },
      }),
    }),
    createSession: builder.mutation<GetSessionResponse, GetSessionRequest>({
      query: (credentials) => ({
        url: `authentication/session/new?api_key=${credentials.key}`,
        method: "POST",
        body: {
          request_token: credentials.request_token,
        },
      }),
    }),
    getUserData: builder.query({
      query: (credentials) =>
        `account?api_key=${credentials.key}&session_id=${credentials.session_id}`,
    }),
    addToWatchList: builder.mutation<
      AddToWatchListResponse,
      AddToWatchListRequest
    >({
      query: (credentials) => ({
        url: `account/${credentials.account_id}/watchlist?api_key=${credentials.key}&session_id=${credentials.session_id}`,
        method: "POST",
        body: {
          media_type: credentials.media_type,
          media_id: credentials.media_id,
          watchlist: credentials.watchlist,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "WATCHLIST" }],
    }),
    getWatchList: builder.query({
      query: (credentials) =>
        `account/${credentials.account_id}/watchlist/movies?api_key=${credentials.key}&session_id=${credentials.session_id}&sort_by=created_at.asc&page=1`,
      providesTags: (data: any) =>
        data.results
          ? [
              ...data.results.map(({ id }: { id: any }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "WATCHLIST" },
            ]
          : [{ type: "Post", id: "WATCHLIST" }],
    }),
  }),
});

export const {
  useCreateTokenQuery,
  useLoginMutation,
  useCreateSessionMutation,
  useGetUserDataQuery,
  useAddToWatchListMutation,
  useGetWatchListQuery,
} = userApi;
