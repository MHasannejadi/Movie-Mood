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

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
  }),
});

export const {
  useCreateTokenQuery,
  useLoginMutation,
  useCreateSessionMutation,
  useGetUserDataQuery,
} = userApi;
