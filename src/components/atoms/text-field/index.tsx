import React, { FC } from "react";

import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

import { useController } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
}

export const TextField: FC<TextFieldProps> = ({ label, type, name, defaultValue }) => {
  const { field, formState } = useController({ name, defaultValue: defaultValue ?? "" });

  const errorMessage = formState.errors[name]?.message;

  return (
    <FormControl>
      <FormLabel userSelect="none">{label}</FormLabel>
      <Input defaultValue={defaultValue} type={type} {...field} isDisabled={formState.isSubmitting} />
      {errorMessage ? <FormHelperText color="red.500">{String(errorMessage)}</FormHelperText> : null}
    </FormControl>
  );
};
