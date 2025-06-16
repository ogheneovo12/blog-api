import BlogPostCard from "@/components/BlogPostCard";
import RenderIf from "../components/RenderIf";
import { useGetBlogPostsInfiniteQuery } from "../lib/redux/services/blog-post.api.service";
import { Button } from "../components/ui/button";

function Home() {
  const { data, isFetching, fetchNextPage } = useGetBlogPostsInfiniteQuery();

  const handleNextPage = async () => {
    await fetchNextPage();
  };

  const allResults = data?.pages.map((p) => p.blog_posts).flat() ?? [];

  return (
    <div className="min-h-screen w-full">
      <h2 className="text-lg font-bold mb-4">Blog Posts</h2>

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

Home.propTypes = {};

export default Home;
