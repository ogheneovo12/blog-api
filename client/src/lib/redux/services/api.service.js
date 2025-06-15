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

export const ApiService = createApi({
  reducerPath: "Api",
  baseQuery: baseQuery,
  tagTypes: ["Auth", "Profile", "BlogPost"],
  endpoints: () => ({}),
});
