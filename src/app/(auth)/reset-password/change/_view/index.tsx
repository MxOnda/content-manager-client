"use client";
import React from "react";
import { AuthCard } from "../../../components/auth-card";
import { Button, useToast } from "@chakra-ui/react";
import { ResetPasswordChangeFormValues, resetPasswordChangeSchema } from "./form/schema";
import { TextField } from "@/components/atoms/text-field";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

async function resetPasswordChange({
  token,
  ...values
}: ResetPasswordChangeFormValues & { token: string }): Promise<any> {
  try {
    const response = await axiosInstance.put("/auth/reset-password/change", values, { params: { token } });

    return { ...response.data, status: 200 };
  } catch (err) {
    if (isAxiosError(err)) return err.response?.data;
  }
}

export const ChangeResetPasswordView = () => {
  const searchParams = useSearchParams();
  const mutation = useMutation({ mutationFn: resetPasswordChange });

  const toast = useToast();

  const router = useRouter();

  async function handleSubmit(values: ResetPasswordChangeFormValues) {
    const token = searchParams.get("token");

    if (!token)
      return toast({
        title: "No se ha proporcionado un token de cambio de contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    const response = await mutation.mutateAsync({
      confirmNewPassword: values.confirmNewPassword,
      newPassword: values.newPassword,
      token,
    });

    if (![200, 201].includes(response.status))
      return toast({
        title: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    toast({
      title: "Contraseña cambiada correctamente",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    router.push("/signin");
  }

  return (
    <AuthCard
      footer={
        <Button colorScheme="green" w="full" type="submit">
          Cambiar contraseña
        </Button>
      }
      title="Cambiar Contraseña"
      subtitle="Ingresa tu nueva contraseña para cambiarla"
      schema={resetPasswordChangeSchema}
      formName="resetPasswordChangeForm"
      onSubmit={handleSubmit}
    >
      <TextField name="newPassword" label="Nueva contraseña" type="password" />
      <TextField name="confirmNewPassword" label="Confirmar contraseña" type="password" />
    </AuthCard>
  );
};
