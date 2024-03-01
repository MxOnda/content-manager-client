"use client";
import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { Center, CircularProgress, Text, VStack, useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/utils/axios-instance";

async function validateInvitation(invitationToken: string) {
  console.log("Validating invitation token", invitationToken);

  try {
    const response = await axiosInstance.post("/auth/confirm-email", undefined, {
      params: { token: invitationToken },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }

  return {
    data: "hello",
  };
}

const ConfirmEmailPage = () => {
  const searchParams = useSearchParams();
  const toast = useToast();

  const { data, error, isPending } = useQuery({
    queryKey: ["validateInvitation", "invitationToken"],
    queryFn: () => {
      return validateInvitation(searchParams.get("token")!);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        toast({
          title: "¡Tu cuenta ha sido verificada!",
          description: "Ya puedes ingresar a tu cuenta.",
          position: "top-right",
          duration: 5000,
        });

        window.location.href = "/signin";
      }
    }, 2000);
  }, [data, toast]);

  if (isPending) {
    return (
      <Center backgroundColor="gray.100" h="100vh">
        <VStack spacing="6">
          <Text fontWeight="semibold" fontSize="xl">
            Verificando tu invitación
          </Text>
          <CircularProgress thickness="4px" size={16} isIndeterminate />
        </VStack>
      </Center>
    );
  }

  if (data && !error) {
    return (
      <Center backgroundColor="gray.100" h="100vh">
        <VStack spacing="6">
          <Text textAlign="center" fontWeight="semibold" fontSize="xl">
            ¡Tu cuenta ha sido verificada! <br /> Redirigiendo a la página de inicio...
          </Text>
          <CircularProgress thickness="4px" size={16} isIndeterminate />
        </VStack>
      </Center>
    );
  }
};

export default ConfirmEmailPage;
