import React, { useCallback, useMemo } from "react";

import { AspectRatio, Button, Image, Stack, Tag } from "@chakra-ui/react";

import { useDropzone } from "react-dropzone";

import { useController } from "react-hook-form";

export const UploadZoneComponent = () => {
  const { field } = useController({ name: "file" });
  const { field: fieldType } = useController({ name: "type" });

  const fileUrl = useMemo(() => {
    if (!field.value) return "";

    const url = URL.createObjectURL(field.value);

    return url;
  }, [field]);

  const onDrop = useCallback((acceptedFiles: File[]) => field.onChange(acceptedFiles[0]), [field]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [".jpg", ".jpeg", ".png"], "video/*": [".mp4"] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <Stack>
      {field.value ? (
        fieldType.value === "Post" ? (
          <AspectRatio>
            <Image alt="" src={fileUrl} />
          </AspectRatio>
        ) : (
          <Image alt="" src={fileUrl} />
        )
      ) : null}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button w="full">Seleccionar Imagen</Button>
      </div>
      <Tag
        textAlign="center"
        justifyContent="center"
        variant="solid"
        // colorScheme="green"
        colorScheme={field?.value ? "green" : "red"}
        fontWeight="medium"
        fontSize="sm"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        px="4"
      >
        {field?.value?.name}
      </Tag>
    </Stack>
  );
};
