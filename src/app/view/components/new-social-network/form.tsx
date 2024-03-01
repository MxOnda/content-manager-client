import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@chakra-ui/react";

import { TextField } from "@/components/atoms/text-field";
import { NewSocialNetworkFormValues, resolver } from "./schema";
import { SocialNetworkType } from "./social-network-type";

interface NewRedSocialFormProps {
  onSubmit: (values: NewSocialNetworkFormValues) => void;
}

export const NewRedSocialForm: FC<NewRedSocialFormProps> = ({ onSubmit }) => {
  const methods = useForm<NewSocialNetworkFormValues>({
    resolver,
    defaultValues: {
      identifier: "content.manager.project2",
      password: "ContentManager0311.",
    },
  });

  return (
    <FormProvider {...methods}>
      <Stack as="form" id="new-social-network-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextField label="Nombre de usuario" name="identifier" type="text" />
        <TextField label="Contraseña" name="password" type="password" />
        <SocialNetworkType />
      </Stack>
    </FormProvider>
  );
};
