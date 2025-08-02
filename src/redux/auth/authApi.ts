import { baseApi } from '../api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    refreshToken: builder.query({
      query: () => ({
        url: '/auth/login/refresh-token',
        method: 'GET',
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenQuery, useGetMeQuery } =
  authApi;
