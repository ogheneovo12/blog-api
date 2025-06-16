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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorString } from "@/utils/error-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useLoginMutation } from "../lib/redux/services/auth.api.service";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowLoginForm } from "../lib/redux/slices/layout.slice";

const formSchema = z.object({
  email: z.string().email({ message: "Valid Email" }),
  password: z.string(),
});

function LoginModal() {
  const showLoginForm = useSelector((state) => state.layout.showLoginForm);
  const [initiateLogin, { isLoading: isInitiateLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      await initiateLogin({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(toggleShowLoginForm());
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
      open={showLoginForm}
      onOpenChange={() => dispatch(toggleShowLoginForm())}
    >
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>welcome back</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      type="passwrod"
                      placeholder="enter your password here"
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
              {isInitiateLoading ? "Sending code..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export default LoginModal;
