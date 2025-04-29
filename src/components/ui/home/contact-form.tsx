"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMessage } from "@/lib/contact-form/actions";
import { useForm } from "react-hook-form";
import { State } from "@/lib/contact-form/actions";

const messageFormSchema = z.object({
  // id: z.string(),
  email: z
    .string()
    .min(10, { message: "This field has to be filled." })
    .email("Please enter valid email."),
  message: z
    .string({
      invalid_type_error: "Please enter a message ...",
    })
    .min(10, { message: "This field has to be filled." }),
  // date: z.string(),
});

export default function MessageForm() {
  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const initialState: State = {
    message: "",
    errors: { email: [], message: [] },
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    createMessage,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Message sent successfully!");
      form.reset(); // Reset form after successful submission
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>Your email</FormDescription>
              {state?.errors?.email && (
                <p className="text-sm text-red-500">
                  {state.errors.email.join(", ")}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Write me a letter..." {...field} />
              </FormControl>
              <FormDescription>Your message</FormDescription>
              {state?.errors?.message && (
                <p className="text-sm text-red-500">
                  {state.errors.message.join(", ")}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
