import React, { useCallback, lazy, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersListContainer, UserContainer, UserName, NoResultsMessage } from "./styles";
import Button from "../Button";
import { fetchUserContent, clearSearch } from "../../redux/actions/user-actions";

const LazyUserContent = lazy(() => import("../UserContent"));

function UsersList() {
  const dispatch = useDispatch();
  
  const userContentState = useSelector((state) => state.userContent);
  const hasSearched = useSelector((state) => state.userContent.hasSearched);
  const searchResults = useSelector((state) => state.userContent.searchResults);
  const dashboardUsers = useSelector((state) => state.dashboard.users);

  const users = hasSearched ? searchResults : dashboardUsers;

  const userContent = useMemo(() => userContentState?.userContent || {}, [userContentState?.userContent]);
  const isLoadingUserContent = useMemo(() => userContentState?.isLoadingUserContent || {}, [userContentState?.isLoadingUserContent]);

  const handleViewContent = useCallback((userId) => {
    dispatch(fetchUserContent(userId));
  }, [dispatch]);

  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  if (hasSearched && users.length === 0) {
    return (
      <NoResultsMessage>
        No results for this search. <Button onClick={handleClearSearch}>Clear Search</Button>
      </NoResultsMessage>
    );
  }

  return (
    <UsersListContainer>
      {users.map((user) => (
        <UserContainer key={`user-${user.id}`}>
          <UserName>{user.name}</UserName>
          {userContent[user.id] && userContent[user.id].length > 0 ? (
            <Suspense fallback={<Button isLoading />}>
              <LazyUserContent users={userContent[user.id]} />
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
