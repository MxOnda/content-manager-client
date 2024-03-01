import React from "react";

import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useController } from "react-hook-form";

export const ContentType = () => {
  const { field } = useController({ name: "type" });

  return (
    <FormControl>
      <FormLabel>Tipo de Contenido</FormLabel>
      <RadioGroup {...field}>
        <Stack direction="row">
          <Radio value="Post">Publicación</Radio>
          <Radio value="Story">Historia</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};
