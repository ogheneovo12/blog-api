import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorString } from "@/utils/error-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { useRegisterMutation } from "../lib/redux/services/auth.api.service";
import { toggleShowRegisterationForm } from "../lib/redux/slices/layout.slice";

const formSchema = z.object({
  email: z.string().email({ message: "Valid Email" }),
  password: z.string().min(8),
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  blog_name: z.string().trim().min(1),
});

function SignupModal() {
  const showRegisterationForm = useSelector(
    (state) => state.layout.showRegisterationForm
  );
  const [initiateRegisteration, { isLoading: isInitiateLoading }] =
    useRegisterMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      blog_name: "",
    },
  });

  async function onSubmit(values) {
    try {
      console.log("Hi");
      await initiateRegisteration({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        blog_name: values.blog_name,
      }).unwrap();
      dispatch(toggleShowRegisterationForm());
    } catch (err) {
      const error = getErrorString(err);
      if (err.data.errors && typeof err.data.errors === "object") {
        Object.keys(err.data.errors).forEach((key) => {
          form.setError(key, err.data.errors?.[key]);
        });
      }
      toast.error(error);
    }
  }

  return (
    <Dialog
      open={showRegisterationForm}
      onOpenChnage={() => dispatch(toggleShowRegisterationForm())}
    >
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Signup</DialogTitle>
            <DialogDescription>
              Register with us to start writing
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      disabled={isInitiateLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      disabled={isInitiateLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jondoe@gmail.com"
                      {...field}
                      disabled={isInitiateLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="passw0ed"
                      placeholder="enter your password here"
                      {...field}
                      disabled={isInitiateLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blog_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Blog Name"
                      {...field}
                      disabled={isInitiateLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={isInitiateLoading}
            >
              {isInitiateLoading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export default SignupModal;
