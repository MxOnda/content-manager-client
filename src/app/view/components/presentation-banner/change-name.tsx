import { apiClient } from "@/services/client";
import { HStack, IconButton, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { FC, useMemo, useState } from "react";
import { Check, Edit, Edit2, X } from "react-feather";

async function updateProfile({ name, userId }: { name: string; userId: string }) {
  try {
    const response = await apiClient.put(`/users/${userId}/profile`, { name });

    return {
      ...response.data,
      status: 200,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        error: err.response?.data,
        status: err.response?.status,
      };
    }
  }

  console.log("Updating profile", userId, name);
}

interface ChangeNameProps {
  currentName: string;
}

export const ChangeName: FC<ChangeNameProps> = ({ currentName }) => {
  const toast = useToast();

  const [nameValue, setNameValue] = useState(currentName);

  const userId = useMemo(() => {
    const currentUser = JSON.parse(localStorage.getItem("current-user") || "{}");
    return currentUser.id;
  }, []);

  const mutation = useMutation({ mutationFn: updateProfile });

  const [isEditing, setIsEditing] = useState(false);

  async function handleSave() {
    const response: any = await mutation.mutateAsync({
      name: nameValue,
      userId,
    });

    console.log(response);

    if (response?.status && ![200, 201].includes(response.status)) {
      return toast({
        title: response.error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }

    setIsEditing((prev) => !prev);

    const currentUser = JSON.parse(localStorage.getItem("current-user") || "{}");

    localStorage.setItem("current-user", JSON.stringify({ ...currentUser, fullname: nameValue }));

    toast({ title: "Nombre actualizado", status: "success", duration: 9000, isClosable: true, position: "top-right" });
  }

  return (
    <HStack>
      {isEditing ? (
        <Input
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          variant="flushed"
          defaultValue={currentName}
        />
      ) : (
        <b>{nameValue}</b>
      )}

      {isEditing ? (
        <HStack>
          <IconButton
            size="xs"
            aria-label="Edit name"
            onClick={() => {
              setIsEditing((prev) => !prev);
              setNameValue(currentName);
            }}
          >
            <X strokeWidth="2.5" size="1rem" />
          </IconButton>
          <IconButton size="xs" aria-label="Edit name" onClick={handleSave}>
            <Check strokeWidth="2.5" size="1rem" />
          </IconButton>
        </HStack>
      ) : (
        <IconButton size="xs" aria-label="Edit name" onClick={() => setIsEditing((prev) => !prev)}>
          <Edit2 strokeWidth="2.5" size="1rem" />
        </IconButton>
      )}
    </HStack>
  );
};
