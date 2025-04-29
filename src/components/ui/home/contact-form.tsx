"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMessage } from "@/lib/contact-form/actions";
import { useForm } from "react-hook-form";
import { State } from "@/lib/contact-form/actions";

export default function MessageForm() {
  const form = useForm();

  const initialState: State = { message: "", errors: { email: [], message: [] }, success: false };
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="example@example.com" {...field} />
              <FormDescription>Your email</FormDescription>
              <FormMessage>{state?.errors?.email}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Write me a letter..." {...field} />
              <FormDescription>Your message</FormDescription>
              <FormMessage>{state?.errors?.message}</FormMessage>
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
