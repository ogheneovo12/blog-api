import { Fragment } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { AppAlert } from "../../components/Alert";
import BlogPostCard from "../../components/BlogPostCard";
import BlogPostForm from "../../components/BlogPostForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useEditBlogPostMutation,
  useGetMyBlogPostQuery,
} from "../../lib/redux/services/blog-post.api.service";
import { getErrorString } from "../../utils/error-utils";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

function EditPost() {
  const params = useParams();
  const { data, isLoading, isError, error, isUninitialized } =
    useGetMyBlogPostQuery(params.id, { skip: !params.id });

  const [editBlogPost, { isLoading: isEditing }] = useEditBlogPostMutation();

  async function handleEditBlogPost(values) {
    try {
      if (!data.blog_post) return;
      await editBlogPost({ id: params.id, payload: values }).unwrap();
      toast.success("Blog Post Edited Successfully");
    } catch (err) {
      const error = getErrorString(err);
      toast.error(error);
    }
  }

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

    return (
      <BlogPostForm
        initialValues={data.blog_post}
        onSubmit={handleEditBlogPost}
        title={"Editing Blog Post"}
        isLoading={isEditing}
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle className={"flex items-center justify-between"}>
            Editting {data?.blog_post?.title || "{{BLOG POST}}"}
            <Button asChild variant={"outline"}>
              <Link to={`/blog-post/view/${params.id}`}>
                View Post <ExternalLinkIcon />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>{render()}</CardContent>
      </Card>
    </Fragment>
  );
}

export default EditPost;
