import { ApiService } from "./api.service";

export const blogPostApi = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) =>
          lastPageParam + 1,
      },
      query: ({ filters, pageParam }) => ({
        url: `blog-posts`,
        params: {
          ...filters,
          page: pageParam,
          limit: filters?.limit || 20,
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["BlogPost"],
    }),
    getOneBlogPost: builder.query({
      query: (id) => ({
        url: `blog-posts/view/${id}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => [{ type: "BlogPost", id: arg }],
    }),
    getMyBlogPosts: builder.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) =>
          lastPageParam + 1,
      },
      query: ({ filters, pageParam }) => ({
        url: `blog-posts/mine`,
        params: {
          ...filters,
          page: pageParam,
          limit: filters?.limit || 20,
        },
      }),
      transformResponse: (response) => response.data,
    }),
     getMyBlogPost: builder.query({
      query: (id) => ({
        url: `blog-posts/mine/${id}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => [{ type: "BlogPost", id: arg }],
    }),
    createBlogPost: builder.mutation({
      query: (body) => ({
        url: "blog-posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BlogPost"],
    }),
    editBlogPost: builder.mutation({
      query: ({ id, payload }) => ({
        url: `blog-posts/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "BlogPost", id: arg.id },
      ],
    }),
    deleteBlogPost: builder.mutation({
      query: (id) => ({
        url: `blog-posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogPost"],
    }),
  }),
  overrideExisting: process.env.NODE_ENV == "development",
});

export const {
  endpoints: blogPostApiEndpoints,
  useGetMyBlogPostsInfiniteQuery,
  useGetBlogPostsInfiniteQuery,
  useCreateBlogPostMutation,
  useGetOneBlogPostQuery,
  useDeleteBlogPostMutation,
  useEditBlogPostMutation,
  useGetMyBlogPostQuery
} = blogPostApi;
