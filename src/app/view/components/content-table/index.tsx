import React, { useState } from "react";

import {
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  Tooltip,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios-instance";

import moment from "moment";

import "moment/locale/es";
import { ContentPreview } from "./content-preview";
import { UsernameMenu } from "./username-menu";
import { ContentTypeMenu } from "./content-type-menu";

async function retrieveUserContent() {
  const currentUser = JSON.parse(localStorage.getItem("current-user") || "{}");

  try {
    const response = await axiosInstance.get(`/users/${currentUser.id}/contents`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export const ContentTable = () => {
  const [usernameSelected, setUsernameSelected] = useState<string | undefined>();
  const [contentType, setContentType] = useState<string | undefined>();

  const { data } = useQuery({
    queryKey: ["userContent"],
    queryFn: retrieveUserContent,
  });

  return (
    <Stack>
      <HStack>
        <UsernameMenu
          usernames={Array.from(new Set(data?.data.map((item: any) => item.socialNetwork.identifier)))}
          onUsernameSelected={setUsernameSelected}
        />
        <ContentTypeMenu onContentTypeSelected={setContentType} />
      </HStack>
      <Card border="1px" borderColor="gray.200">
        <>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th py="3">Imagen</Th>
                  <Th py="3">Tipo</Th>
                  <Th py="3">Título Principal</Th>
                  <Th py="3">Red Social</Th>
                  <Th py="3">Username</Th>
                  <Th py="3" textAlign="center">
                    Estatus
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data
                  ?.filter((item: any) => {
                    if (usernameSelected && contentType)
                      return item.socialNetwork.identifier === usernameSelected && item.type === contentType;
                    if (usernameSelected) return item.socialNetwork.identifier === usernameSelected;
                    if (contentType) return item.type === contentType;
                    return item;
                  })
                  .map((content: any) => (
                    <Tr key={content.id}>
                      <Td>
                        <ContentPreview multimediaUrl={content.multimediaUrl} />
                      </Td>
                      <Td>
                        <strong>{content.type === "Post" ? "Publicación" : "Historia"}</strong>
                      </Td>
                      <Td>
                        <Tooltip label={content.caption} placement="top">
                          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="32">
                            {content.caption}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td>
                        <b>{content.socialNetwork.socialNetwork}</b>
                      </Td>
                      <Td>
                        <b>{content.socialNetwork.identifier}</b>
                      </Td>
                      <Td textAlign="center">
                        {content.scheduledAt ? (
                          <Tooltip
                            label={`Se publicará el ${moment(content.scheduledAt).format("LLL")}`}
                            placement="top"
                          >
                            <Tag cursor="pointer" variant="solid" colorScheme="orange">
                              Pendiente
                            </Tag>
                          </Tooltip>
                        ) : (
                          <Tooltip label={`Publicado el ${moment(content.uploadedAt).format("LLL")}`} placement="top">
                            <Tag cursor="pointer" variant="solid" colorScheme="green">
                              Publicado
                            </Tag>
                          </Tooltip>
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      </Card>
    </Stack>
  );
};
