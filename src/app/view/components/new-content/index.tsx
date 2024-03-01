import React, { useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { UploadZoneComponent } from "./upload-zone";
import { TextAreaComponent } from "./text-area";
import { ContentType } from "./content-type";
import { SchedulePublication } from "./schedule-publication";
import { FormProvider, useForm } from "react-hook-form";
import { NewContentFormValues, resolver } from "./schema";
import { SelectSocialMedia } from "./select-social-media";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { Camera } from "react-feather";

async function publishContent(values: FormData) {
  try {
    const response = await axiosInstance.post("/content-manager/publish", values, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    }
  }
}

export const NewContentComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: publishContent,
  });

  const methods = useForm<NewContentFormValues>({
    resolver,
    defaultValues: { socialNetwork: "Instagram" },
  });

  async function handleSubmit(values: NewContentFormValues) {
    console.log(values);

    const scheduledAt = moment(values.scheduledAt);

    if (values.isScheduled) {
      if (scheduledAt.isBefore(moment())) {
        toast({
          title: "Error",
          description: "El horario de publicación no puede ser en el pasado",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        return;
      }

      if (scheduledAt.minutes() % 10 !== 0) {
        toast({
          title: "Error",
          description: "El horario de publicación debe ser en intervalos de 10 minutos",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        return;
      }

      if (scheduledAt.isBefore(moment().add(10, "minutes"))) {
        toast({
          title: "Error",
          description: "El horario de publicación debe ser al menos 10 minutos después de ahora",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        return;
      }
    }

    const formData = new FormData();

    console.log(values.file);

    formData.append("socialNetworkId", values.socialNetworkId);
    formData.append("socialNetwork", values.socialNetwork);
    formData.append("caption", values.caption);
    formData.append("type", values.type);
    formData.append("isScheduled", values.isScheduled.toString());

    if (values.isScheduled) formData.append("scheduledAt", scheduledAt.toISOString());

    formData.append("fileContent", values.file);

    const response = await mutation.mutateAsync(formData);

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

    toast({
      title: "Publicación creada",
      description: "La publicación ha sido creada con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    onClose();
  }

  useEffect(() => {
    if (isOpen) methods.reset();
  }, [isOpen, methods]);

  console.log(methods.formState.errors);
  

  return (
    <>
      <Button variant="outline" colorScheme="blue" onClick={onOpen}>
        <Camera size="1.25rem" />
        <Text ml="2">Crear Publicación</Text>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nuevo contenido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...methods}>
              <Stack id="create-content" spacing="4" as="form" onSubmit={methods.handleSubmit(handleSubmit)}>
                <UploadZoneComponent />
                <SelectSocialMedia />
                <ContentType />
                <TextAreaComponent />
                <SchedulePublication />
              </Stack>
            </FormProvider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" form="create-content" isLoading={mutation.isPending}>
              <Text ml="2">Crear Publicación</Text>
            </Button>
            <Button isLoading={mutation.isPending} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
