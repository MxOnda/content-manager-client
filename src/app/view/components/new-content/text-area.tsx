import React, { useEffect } from "react";

import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useController } from "react-hook-form";

export const TextAreaComponent = () => {
  const { field } = useController({ name: "caption", defaultValue: "no-content" });

  const { field: fieldType } = useController({ name: "type" });

  console.log(fieldType.value);

  if (fieldType.value === "Story") return null;

  return (
    <FormControl>
      <FormLabel>Contenido</FormLabel>
      <Textarea
        value={field.value}
        placeholder="Escribe tu contenido"
        onChange={(e) => {
          const newValue = e.target.value;
          console.log(newValue);

          field.onChange(newValue);
        }}
      />
    </FormControl>
  );
};
