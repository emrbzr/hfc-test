import styled from 'styled-components';

export const StyledButton = styled.button`
  width: ${props => props.width || '140px'};
  height: ${props => props.height || '44px'};
  border-radius: ${props => props.borderRadius || '37px'};
  background-color: #1C33EE;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #254edb;
  }
`;