"use client";
import React from "react";
import { AuthCard } from "../../components/auth-card";
import { Button, useToast } from "@chakra-ui/react";
import { ResetPasswordFormValues, resetPasswordSchema } from "./form/schema";
import { TextField } from "@/components/atoms/text-field";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios-instance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

async function resetPasswordFn(email: string) {
  try {
    const response = await axiosInstance.post("/auth/reset-password", { email });

    return { ...response.data, status: 200 };
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response;
    }
  }
}

export const ResetPassswordView = () => {
  const mutation = useMutation({ mutationFn: resetPasswordFn });

  const router = useRouter();

  const toast = useToast();

  async function handleSubmit(values: ResetPasswordFormValues) {
    const response = await mutation.mutateAsync(values.email);

    if (![200, 201].includes(response.status))
      return toast({
        title: response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

    toast.closeAll();

    toast({
      title: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    router.push("/signin");
  }

  return (
    <AuthCard
      schema={resetPasswordSchema}
      formName="resetPasswordForm"
      onSubmit={handleSubmit}
      footer={
        <Button type="submit" colorScheme="green" w="full">
          Solicitar recuperación
        </Button>
      }
      title="Recuperar Contraseña"
      subtitle="Ingresa tu correo electrónico para recuperar tu contraseña"
    >
      <TextField name="email" label="Correo electrónico" type="email" />
    </AuthCard>
  );
};
