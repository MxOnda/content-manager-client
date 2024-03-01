import * as z from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
