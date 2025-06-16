import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";
import TiptapEditorForm from "./Tiptap/Tiptap";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const formSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  body:  z.string().trim().min(1),
  state: z.string(),
  tags: z.array(z.string()).optional(),
});

function BlogPostForm({
  disabled,
  initialValues,
  onSubmit,
  isLoading,
  hideAction,
  basic = false,
}) {
  const defaultValues = useMemo(
    () => ({
      title: initialValues?.title || "",
      body: initialValues?.body || "",
      description: initialValues?.description || "",
      state: initialValues?.state || "draft",
      tags: initialValues?.tags || [],
    }),
    [initialValues]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
        <div className="space-y-8 p-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Idea Title"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Description</FormLabel>
                <FormControl>
                  <Input
                    maxLength={200}
                    placeholder="Headline For Blog Post"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!basic ? (
            <div className="space-y-8">
              <FormField
                disabled={disabled}
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Content</FormLabel>
                    <FormControl>
                      <TiptapEditorForm
                        value={field.value}
                        setValue={(val) => form.setValue("body", val)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <CreatableSelect
                        value={field.value.map((val) => ({
                          value: val,
                          label: val,
                        }))}
                        isClearable
                        isMulti
                        onChange={(vals) => {
                          form.setValue(
                            "tags",
                            vals.map((val) => val.value)
                          );
                        }}
                        options={field.value.map((val) => ({
                          value: val,
                          label: val,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="draft" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Draft (Visible to only you)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="published" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Published (Visible to you and others)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}
        </div>

        <div>
          {!hideAction && (
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading || disabled}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default BlogPostForm;
