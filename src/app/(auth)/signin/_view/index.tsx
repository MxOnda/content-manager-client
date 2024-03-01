"use client";
import React from "react";

import Link from "next/link";

import { Button, useToast } from "@chakra-ui/react";
import { AuthCard } from "../../components/auth-card";
import { TextField } from "@/components/atoms/text-field";
import { SigninFormValues, signinSchema } from "./form/schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signinAction } from "@/actions/signin";
import { apiClient } from "@/services/client";

async function signinFn({ email, password }: { email: string; password: string }) {
  try {
    const response = await apiClient.post("/auth/signin", { email, password });

    return {
      ...response.data,
      status: 200,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        error: err.response?.data,
        status: err.response?.status,
      };
    }
  }
}

export const SigninView = () => {
  const mutation = useMutation({ mutationFn: signinFn });
  const toast = useToast();
  const router = useRouter();

  async function handleSubmit(values: SigninFormValues) {
    const response = await mutation.mutateAsync(values);

    if (response?.status && ![200, 201].includes(response.status)) {
      return toast({
        title: response.error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }

    localStorage.setItem("current-user", JSON.stringify(response.data.user));
    localStorage.setItem("access-token", response.data.token);

    await signinAction({ token: response.data.token, currentUser: response.data.user });

    router.push("/");
  }

  return (
    <AuthCard
      formName="signin"
      onSubmit={handleSubmit}
      schema={signinSchema}
      subtitle="Ingresa tus datos para acceder a la plataforma de administración"
      title="Iniciar Sesión"
      footer={
        <>
          <Button colorScheme="green" w="full" type="submit">
            Iniciar Sesión
          </Button>

          <Link href="/register">
            <Button w="full" variant="outline">
              Registrarse
            </Button>
          </Link>
        </>
      }
    >
      <TextField name="email" label="Correo electrónico" type="email" />
      <TextField name="password" label="Contraseña" type="password" />
      <Link href="/reset-password">
        <Button w="full" variant="link">
          ¿Olvidaste tu contraseña?
        </Button>
      </Link>
    </AuthCard>
  );
};
