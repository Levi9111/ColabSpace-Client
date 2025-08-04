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

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    register: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    generateOtp: builder.mutation({
      query: (data: { email: string }) => ({
        url: '/auth/generate-otp',
        method: 'POST',
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenQuery,
  useGetMeQuery,
  useLogoutMutation,

  useRegisterMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
} = authApi;
