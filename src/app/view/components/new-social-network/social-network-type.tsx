import React from "react";

import { HStack, Radio, RadioGroup, Stack, Tag, Text } from "@chakra-ui/react";

import { useController } from "react-hook-form";

const defaultValue = "Instagram";

export const SocialNetworkType = () => {
  const { field } = useController({ name: "socialNetwork", defaultValue });

  return (
    <RadioGroup onChange={field.onChange} value={field.value} defaultValue={defaultValue} colorScheme="blue">
      <Stack direction="row">
        <Radio value="Instagram">Instagram</Radio>
        <HStack>
          <Radio isDisabled value="Facebook">
            <Text>Facebook</Text>
          </Radio>
          <Tag variant="solid" colorScheme="red">
            Próximamente
          </Tag>
        </HStack>
      </Stack>
    </RadioGroup>
  );
};
