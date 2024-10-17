import React, { useCallback } from "react";
import { UsersListContainer, UserContainer, UserName } from "./styles";
import Button from "../Button";

function UsersList({ users }) {
  const handleViewContent = useCallback((userId) => {
    console.log("user id:", userId);
    // TODO: content view action will be here
  }, []);

  return (
    <UsersListContainer>
      {users.map((user) => (
        <UserContainer key={`user-${user.id}`}>
          <UserName>{user.name}</UserName>
          <Button onClick={() => handleViewContent(user.id)}>View Content</Button>
        </UserContainer>
      ))}
    </UsersListContainer>
  );
}

export default UsersList;
