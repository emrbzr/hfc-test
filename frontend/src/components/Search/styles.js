import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;

  &::placeholder {
    font-weight: 500;
    font-size: 18px;
    color: #878EA7;
  }
`;
