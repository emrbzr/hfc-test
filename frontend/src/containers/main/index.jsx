import React, { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, SearchWrapper } from "./styles";
import { onLoadDashboardUsers } from "../../redux/actions/dashboard-actions";
import Search from "../../components/Search";
import LoadingSpinner from "../../components/LoadingSpinner";

const UsersList = lazy(() => import("../../components/UsersList"));

export const MainContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.dashboard.users);
  const isLoading = useSelector((state) => state.dashboard.isLoading);
  const searchResults = useSelector((state) => state.userContent.searchResults);

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  const usersToDisplay = searchResults && searchResults.length > 0 ? searchResults : users;

  return (
    <Container>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner message="Fetching users data..." />
        ) : (
          <UsersList users={usersToDisplay} />
        )}
      </Suspense>
    </Container>
  );
};

export default MainContainer;
