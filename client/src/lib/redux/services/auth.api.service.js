import { ApiService } from "./api.service";

export const authApi = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `auth/me`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Profile"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
       transformResponse: (response) => response.data,
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
       transformResponse: (response) => response.data,
    }),
  }),
  overrideExisting: process.env.NODE_ENV == "development",
});

export const {
  endpoints: authApiEndpoints,
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
} = authApi;
