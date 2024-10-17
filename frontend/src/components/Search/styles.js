import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 30px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  &::placeholder {
    font-weight: 500;
    font-size: 18px;
    color: #878EA7;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
`;
