"use server";

import { z } from "zod";
import postgres from "postgres";

const messageFormSchema = z.object({
  email: z
    .string()
    .min(10, { message: "This field has to be filled." })
    .email("Please enter valid email."),
  message: z
    .string({
      invalid_type_error: "Please enter a message ...",
    })
    .min(10, { message: "This field has to be filled." }),
});

export type State = {
  message?: string | null;
  errors?: {
    email?: string[];
    message?: string[];
  };
  success?: boolean;
};

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function createMessage(prevState: State, formData: FormData) {
  const validatedFields = messageFormSchema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to Create message.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  const { email, message } = validatedFields.data;
  const date = new Date().toISOString();

  try {
    await sql`
    INSERT INTO messages (email, message, date)
    VALUES (${email!}, ${message!}, ${date})
  `;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
  return {
    message: "Message created succesfully!",
    errors: { email: [], message: [] },
    success: true,
  };
}
