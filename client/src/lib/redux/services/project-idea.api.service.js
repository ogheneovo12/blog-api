
import { ApiService } from "./api.service";

export const appApi = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query({
      query: () => ({
        url: `blog-posts`,
      }),
      transformResponse: (response) => response.data,
      providesTags: (results) =>
        results
          ? [
              ...results.map((res) => ({
                type: "BlogPost",
                id: res._id,
              })),
              "BlogPost",
            ]
          : ["BlogPost"],
    }),
    getOneBlogPost: builder.query({
      query: (id) => ({
        url: `blog-posts/view/${id}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, arg) => [{ type: "ProjectIdea", id: arg }],
    }),
    getMyBlogPosts: builder.query({
      query: () => ({
        url: `blog-posts/mine`,
      }),
      transformResponse: (response) => response.data,
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
        url: `blog-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogPost"],
    }),
  }),
  overrideExisting: process.env.NODE_ENV == "development",
});

export const {
  endpoints: appApiEndpoints,
  useGetMyBlogPostsQuery,
  useGetBlogPostsQuery,
  useCreateBlogPostMutation,
  useGetOneBlogPostQuery,
  useDeleteBlogPostMutation,
  useEditBlogPostMutation,
} = appApi;
