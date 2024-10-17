import React, { useEffect, useCallback, Suspense, lazy } from "react";
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

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  const handleSearch = useCallback((searchTerm) => {
    console.log("Searching for:", searchTerm);
    // TODO: search action will be here
  }, []);

  return (
    <Container>
      <SearchWrapper>
        <Search onSearch={handleSearch} />
      </SearchWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner message="Fetching users data..." />
        ) : (
          <UsersList users={users} />
        )}
      </Suspense>
    </Container>
  );
};

export default MainContainer;
