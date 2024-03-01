"use client";
import React, { FC } from "react";

import { Card, CardBody, CardFooter, CardHeader, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";

interface AuthCardProps {
  title: string;
  subtitle: string;
  formName: string;
  schema: any;
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  defaultValues?: any;
}

export const AuthCard: FC<AuthCardProps> = ({
  defaultValues,
  subtitle,
  title,
  children,
  footer,
  schema,
  onSubmit,
  formName,
}) => {
  const methods = useForm({ resolver: zodResolver(schema), defaultValues });

  return (
    <FormProvider {...methods}>
      <Center id={formName} as="form" backgroundColor="gray.100" h="100vh" onSubmit={methods.handleSubmit(onSubmit)}>
        <Card minW="md">
          <CardHeader>
            <Heading mb="2" textAlign="center" size="lg">
              {title}
            </Heading>
            <Text textAlign="center" mx="auto" color="gray.500" fontWeight="medium" maxW="sm">
              {subtitle}
            </Text>
          </CardHeader>
          <CardBody>
            <Stack spacing="6">{children}</Stack>
          </CardBody>
          <CardFooter>
            <Stack w="full">{footer}</Stack>
          </CardFooter>
        </Card>
      </Center>
    </FormProvider>
  );
};
