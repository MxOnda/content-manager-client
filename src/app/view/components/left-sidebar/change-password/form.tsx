import { TextField } from "@/components/atoms/text-field";
import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ChangePasswordFormValues, changePasswordSchema } from "./schema";

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormValues) => void;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const methods = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  return (
    <FormProvider {...methods}>
      <Stack id="change-password-form" as="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextField name="currentPassword" label="Contraseña Actual" type="password" />
        <TextField name="newPassword" label="Nueva Contraseña" type="password" />
        <TextField name="confirmNewPassword" label="Confirmar Nueva Contraseña" type="password" />
      </Stack>
    </FormProvider>
  );
};
