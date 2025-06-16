import RenderIf from "@/components/RenderIf";
import { Fragment } from "react";
import { toast } from "sonner";
import { AppAlert } from "../../components/Alert";
import BlogPostForm from "../../components/BlogPostForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useCreateBlogPostMutation } from "../../lib/redux/services/blog-post.api.service";
import { getErrorString } from "../../utils/error-utils";
import { useNavigate } from "react-router";

function CreatePost() {
  const navigate = useNavigate();
  const [createBlogPost, { isLoading, isError, error }] =
    useCreateBlogPostMutation();

  async function handleCreateBlogPost(values) {
    try {
      const res = await createBlogPost(values).unwrap();
      console.log(res);
      toast.success("Blog Post Created Successfully");
      navigate(`/my-posts/view/${res.data?.blog_post._id}`);
    } catch (err) {
      const error = getErrorString(err);

      toast.error(error);
    }
  }

  const error_string = getErrorString(error);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle className={"flex items-center justify-between"}>
            Creating A Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RenderIf condition={isError}>
            <AppAlert description={error_string} />
          </RenderIf>
          <BlogPostForm onSubmit={handleCreateBlogPost} isLoading={isLoading} />
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default CreatePost;
