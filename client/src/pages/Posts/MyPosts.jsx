import BlogPostCard from "@/components/BlogPostCard";
import { Button } from "../../components/ui/button";
import { useGetMyBlogPostsInfiniteQuery } from "../../lib/redux/services/blog-post.api.service";
import { getErrorString } from "../../utils/error-utils";
import { AppAlert } from "../../components/Alert";
import RenderIf from "../../components/RenderIf";
import { Link } from "react-router";

function MyPosts() {
  const { data, isFetching, fetchNextPage, error, isError } =
    useGetMyBlogPostsInfiniteQuery();

  const handleNextPage = async () => {
    await fetchNextPage();
  };

  const allResults = data?.pages.map((p) => p.blog_posts).flat() ?? [];
  const error_message = getErrorString(error);
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold mb-4">Blog Posts</h2>
        <Button asChild>
          <Link to="/my-posts/create">Create New Post</Link>
        </Button>
      </div>

      <RenderIf condition={isError}>
        <AppAlert title="Error" description={error_message} />
      </RenderIf>
      <RenderIf condition={allResults && allResults?.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {allResults?.map((post) => (
            <BlogPostCard key={post._id} blog_post={post} small={true} />
          ))}
        </div>
      </RenderIf>

      <RenderIf condition={isFetching}>
        <p>Fetching blog posts....</p>
      </RenderIf>
      <div className="flex items-center justify-center my-5">
        <Button variant={"outline"} onClick={handleNextPage}>
          Fetch More
        </Button>
      </div>
    </div>
  );
}

export default MyPosts;
