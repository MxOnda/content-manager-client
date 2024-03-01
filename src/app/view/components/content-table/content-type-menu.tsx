import React, { FC, useState } from "react";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface ContentTypeMenuProps {
  onContentTypeSelected: (contentType: string | undefined) => void;
}

export const ContentTypeMenu: FC<ContentTypeMenuProps> = ({ onContentTypeSelected }) => {
  const [filterSelected, setFilterSelected] = useState<string | undefined>();

  return (
    <Menu>
      <MenuButton size="sm" as={Button}>
        Nombre de usuario:{" "}
        {filterSelected === "Post" ? "Publicaciones" : filterSelected === "Story" ? "Historias" : "Todos"}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setFilterSelected(undefined);
            onContentTypeSelected(undefined);
          }}
        >
          Todos
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterSelected("Post");
            onContentTypeSelected("Post");
          }}
        >
          Publicaciones
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilterSelected("Story");
            onContentTypeSelected("Story");
          }}
        >
          Historias
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
