import styled from "styled-components";

export const UsersListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 902px; // matching the 902px for the search container it is responsive if browser width changes
  margin: 0 auto;
  gap: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1.5rem;
  gap: 10px;
`;

export const UserName = styled.h3`
  font-size: 30px;
  color: #242F57;
  margin: 0 0 0.5rem 0;
  padding: 0;
  text-align: left;
  font-weight: 500;
`;

export const NoResultsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  color: #666;
`;
