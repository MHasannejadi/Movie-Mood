import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  request_token: string;
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
      query: () => `authentication/token/new`,
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/token/validate_with_login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateTokenQuery, useLoginMutation } = userApi;