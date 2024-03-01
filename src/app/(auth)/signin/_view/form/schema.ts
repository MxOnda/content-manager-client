import * as z from "zod";

export const signinSchema = z.object({
  email: z.string().email({
    message: "El correo no es válido",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
