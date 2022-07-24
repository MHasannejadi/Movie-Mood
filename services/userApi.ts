import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { watchlistTagId } from "consts/tagIds";

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
  movie_data: any;
}
export interface AddToWatchListResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface GetWatchListRequest {
  account_id: string;
  session_id: string | null | undefined;
  key: string;
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
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        let patchResult = null;
        if (!patch.watchlist) {
          patchResult = dispatch(
            userApi.util.updateQueryData(
              "getWatchList",
              {
                account_id: patch.account_id,
                session_id: patch.session_id,
                key: patch.key,
              },
              (draft) => {
                const index = draft.results.findIndex(
                  (item) => item.id === patch.media_id
                );
                if (index !== -1) {
                  draft.results.splice(index, 1);
                }
              }
            )
          );
        } else {
          patchResult = dispatch(
            userApi.util.updateQueryData(
              "getWatchList",
              {
                account_id: patch.account_id,
                session_id: patch.session_id,
                key: patch.key,
              },
              (draft) => {
                draft.results.push(patch.movie_data);
              }
            )
          );
        }
        try {
          await queryFulfilled;
        } catch {
          if (!patch.watchlist) {
            patchResult?.undo();
          }
        }
      },
    }),
    getWatchList: builder.query<{ results: Array<any> }, GetWatchListRequest>({
      query: (credentials) =>
        `account/${credentials.account_id}/watchlist/movies?api_key=${credentials.key}&session_id=${credentials.session_id}&sort_by=created_at.asc&page=1`,
      providesTags: (data: any) =>
        data?.results
          ? [
              ...data.results.map(({ id }: { id: any }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: watchlistTagId },
            ]
          : [{ type: "Post", id: watchlistTagId }],
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
