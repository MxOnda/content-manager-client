import React from "react";
import { useController } from "react-hook-form";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { TextField } from "@/components/atoms/text-field";

export const SchedulePublication = () => {
  const { field } = useController({
    name: "isScheduled",
    defaultValue: false,
  });

  return (
    <>
      <FormControl cursor="pointer" display="flex" alignItems="center">
        <Switch id="email-alerts" colorScheme="blue" {...field} />
        <FormLabel userSelect="none" ml="2" htmlFor="email-alerts" mb="0">
          Programar Publicación{" "}
        </FormLabel>
      </FormControl>

      {field.value && (
        <FormControl>
          <TextField name="scheduledAt" type="datetime-local" label="Fecha de Publicación" />
        </FormControl>
      )}
    </>
  );
};
