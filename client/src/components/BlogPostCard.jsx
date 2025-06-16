import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getErrorString } from "@/utils/error-utils";
import { truncateString } from "@/utils/truncate-string";
import clsx from "clsx";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";
import { useDeleteBlogPostMutation } from "../lib/redux/services/blog-post.api.service";
import { AppAlertDialog } from "./Alert";
import RenderIf from "./RenderIf";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAlertState } from "@/hooks/use-alert-state";

function BlogPostCard({ blog_post, small, hideActions, className }) {
  const { openAlert, closeAlert, alertState } = useAlertState();
  const [deleteBlogPost, { isLoading: deletingBlogPost }] =
    useDeleteBlogPostMutation();
  const user = useSelector((state) => state.auth.user);

  const handleDelete = async () => {
    try {
      if (!blog_post) {
        toast.error("Blog Post id not provided");
        return;
      }
      await deleteBlogPost(blog_post?._id).unwrap();
      toast.success(`Deleted Blog Post ${blog_post.title} successfully`);
    } catch (err) {
      toast.error(getErrorString(err));
    }
  };

  const is_author = user?._id === blog_post?.author?._id;

  return (
    <Fragment>
      <Card className={clsx("w-full", className)}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="capitalize">{blog_post?.title}</span>
            <RenderIf condition={!hideActions && is_author}>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={deletingBlogPost}
                  onClick={() =>
                    openAlert({
                      title: `Delete Blog Post  ${blog_post?.title} `,
                      description: "this action is irreversible",
                      onAccept: handleDelete,
                    })
                  }
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash2Icon />
                </Button>
                <Button
                  asChild
                  disabled={deletingBlogPost}
                  variant={"outline"}
                  size={"icon"}
                >
                  <Link to={`/my-posts/edit/${blog_post?._id}`}>
                    <Edit2Icon />
                  </Link>
                </Button>
              </div>
            </RenderIf>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={`https://robohash.org/${blog_post?.author?.email}`}
                />
                <AvatarFallback>
                  {blog_post?.author?.first_name?.[0]}{" "}
                  {blog_post?.author?.last_name[0]}{" "}
                </AvatarFallback>
              </Avatar>
              <b className="capitalize">
                {blog_post?.author?.first_name} {blog_post?.author?.last_name}
              </b>
            </div>
            <h4 className="mt-2">Summary:{blog_post?.description}</h4>
            <h3>{blog_post?.reading_time}</h3>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="min-h-[168px]"
            dangerouslySetInnerHTML={{
              __html: small
                ? truncateString(blog_post?.body || "", 200)
                : blog_post?.body || "",
            }}
          />
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          {small && (
            <Button asChild className="w-full">
              <Link
                to={
                  is_author
                    ? `/my-posts/view/${blog_post?._id}`
                    : `/blog-posts/${blog_post?._id}`
                }
              >
                Read More
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
      <AppAlertDialog
        isOpen={alertState.isOpen}
        title={alertState.title}
        description={alertState.description}
        onCancel={closeAlert}
        onAccept={alertState.onAccept}
        loading={deletingBlogPost}
      />
    </Fragment>
  );
}

export default BlogPostCard;
