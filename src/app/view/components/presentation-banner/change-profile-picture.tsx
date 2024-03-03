import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Avatar, Box, IconButton, useToast } from "@chakra-ui/react";
import { Edit } from "react-feather";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

async function updateProfilePicture(values: { file: FormData; userId: string }) {
  try {
    const response = await axiosInstance.post(`/users/${values.userId}/profile/profile-picture`, values.file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        status: err.response?.status,
        message: err.response?.data.message,
      };
    }
  }
}

export const ChangeProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState("");

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: updateProfilePicture,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const currentUserId = JSON.parse(localStorage.getItem("current-user") as string).id;

    const formData = new FormData();

    formData.append("profile-picture", file);

    const response = await mutation.mutateAsync({ file: formData, userId: currentUserId });

    if (response.status && ![200, 201].includes(response.status)) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    setProfilePicture(response.data.profilePicture);

    localStorage.setItem("current-user", JSON.stringify(response.data));

    toast({
      title: "Éxito",
      description: "La imagen de perfil se ha actualizado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("current-user") as string);

    setProfilePicture(currentUser.profilePicture);
  }, []);

  return (
    <Box pos="relative">
      <Avatar size="xl" src={profilePicture} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <IconButton
          rounded="full"
          border="2px"
          colorScheme="blue"
          pos="absolute"
          bottom="0.5"
          right="0.5"
          aria-label="Edit profile"
        >
          <Edit size="1.25rem" />
        </IconButton>
      </div>
    </Box>
  );
};
