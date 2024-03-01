import React, { FC, useState } from "react";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface UsernameMenuProps {
  onUsernameSelected: (username: string | undefined) => void;
  usernames: string[];
}

export const UsernameMenu: FC<UsernameMenuProps> = ({ onUsernameSelected, usernames = [] }) => {
  const [filterSelected, setFilterSelected] = useState<string | undefined>();

  return (
    <Menu>
      <MenuButton size="sm" as={Button}>
        Nombre de usuario: {filterSelected || "Todos"}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setFilterSelected(undefined);
            onUsernameSelected(undefined);
          }}
        >
          Todos
        </MenuItem>
        {usernames.map((username, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setFilterSelected(username);
              onUsernameSelected(username);
            }}
          >
            {username}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
