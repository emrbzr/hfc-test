import React, { useCallback, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersListContainer, UserContainer, UserName } from "./styles";
import Button from "../Button";
import { fetchUserContent } from "../../redux/actions/user-actions";

const LazyUserContent = lazy(() => import("../UserContent"));

function UsersList({ users }) {
  const dispatch = useDispatch();
  const userContent = useSelector((state) => state.userContent?.userContent || {});
  const isLoadingUserContent = useSelector((state) => state.userContent?.isLoadingUserContent || {});

  const handleViewContent = useCallback((userId) => {
    dispatch(fetchUserContent(userId));
  }, [dispatch]);

  return (
    <UsersListContainer>
      {users.map((user) => (
        <UserContainer key={`user-${user.id}`}>
          <UserName>{user.name}</UserName>
          {userContent[user.id] ? (
            <Suspense fallback={<Button isLoading />}>
              <LazyUserContent content={userContent[user.id]} />
            </Suspense>
          ) : (
            <Button 
              onClick={() => handleViewContent(user.id)}
              isLoading={isLoadingUserContent[user.id]}
            >
              View Content
            </Button>
          )}
        </UserContainer>
      ))}
    </UsersListContainer>
  );
}

export default React.memo(UsersList);
