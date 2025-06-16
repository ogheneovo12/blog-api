import { APP_CONFIG } from "@/config/_app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: APP_CONFIG.BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // If 401, try to refresh token
  if (result.error?.status === 401) {
    // Token Expired - logout
    api.dispatch({ type: "auth/logout" });
  }
  return result;
};

export const ApiService = createApi({
  reducerPath: "Api",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["Auth", "Profile", "BlogPost", "Users"],
  endpoints: () => ({}),
});
