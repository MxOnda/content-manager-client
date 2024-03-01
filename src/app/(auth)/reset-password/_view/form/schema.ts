import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email().min(1),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
