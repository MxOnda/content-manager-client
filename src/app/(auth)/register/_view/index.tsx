"use client";
import React from "react";
import { AuthCard } from "../../components/auth-card";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { TextField } from "@/components/atoms/text-field";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { RegisterFormValues, registerSchema } from "./form/schema";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { apiClient } from "@/services/client";

async function registerUser(values: RegisterFormValues) {
  try {
    const response = await apiClient.post("/auth/register", values);

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response;
    }
  }
}

export const RegisterView = () => {
  const mutation = useMutation({ mutationFn: registerUser });

  const router = useRouter();

  const toast = useToast();

  async function handleSubmit(values: RegisterFormValues) {
    const response = await mutation.mutateAsync(values);

    if (response?.status && ![200, 201].includes(response.status)) {
      return toast({
        title: response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    toast({
      title: "Te hemos enviado una invitación a tu correo para completar el proceso de registro.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    router.push("/signin");
  }

  return (
    <AuthCard
      formName="registerForm"
      onSubmit={handleSubmit}
      schema={registerSchema}
      footer={
        <>
          <Button isLoading={mutation.isPending} type="submit" form="registerForm" colorScheme="green" w="full">
            Registrarse
          </Button>
          <Link href="/signin">
            <Button isLoading={mutation.isPending} w="full" variant="outline">
              Iniciar Sesión
            </Button>
          </Link>
        </>
      }
      title="Registrarse"
      subtitle="Ingresa tus datos para registrarte en la plataforma de administración"
    >
      <Stack>
        <TextField name="fullname" label="Nombre Completo" type="text" />
        <TextField name="email" label="Correo electrónico" type="email" />
        <TextField name="password" label="Contraseña" type="password" />
        <TextField name="confirmPassword" label="Confirmar Contraseña" type="password" />
      </Stack>
    </AuthCard>
  );
};
