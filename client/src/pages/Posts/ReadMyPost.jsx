import { Fragment } from "react";
import { useParams } from "react-router";
import { AppAlert } from "../../components/Alert";
import BlogPostCard from "../../components/BlogPostCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { useGetMyBlogPostQuery } from "../../lib/redux/services/blog-post.api.service";
import { getErrorString } from "../../utils/error-utils";

function ReadMyPost() {
  const params = useParams();
  const { data, isLoading, isError, error, isUninitialized } =
    useGetMyBlogPostQuery(params.id, { skip: !params.id });

  const render = () => {
    if (!params.id) {
      return <AppAlert description={"Invalid Post Id"} />;
    }
    if (isUninitialized || isLoading) {
      return (
        <Skeleton>
          <BlogPostCard />
        </Skeleton>
      );
    }

    if (isError) {
      return <AppAlert description={getErrorString(error)} />;
    }

    return <BlogPostCard blog_post={data?.blog_post} />;
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>
            Viewing {data?.blog_post?.title || "{{BLOG POST}}"}
          </CardTitle>
        </CardHeader>
        <CardContent>{render()}</CardContent>
      </Card>
    </Fragment>
  );
}



export default ReadMyPost;
