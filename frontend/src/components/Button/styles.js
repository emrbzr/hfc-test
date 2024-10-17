import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background-color: #1C33EE;
    color: white;

    &:hover {
      background-color: #254edb;
    }
  `,
  reject: css`
    background-color: #E9EDF7;
    color: #3A3A3A;

    &:hover {
      background-color: #d8e0f0;
    }
  `,
};

export const StyledButton = styled.button`
  padding: 12px 27px;
  border-radius: 37px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  ${props => buttonVariants[props.$variant || 'primary']}
  ${props => props.$fullWidth && 'width: 100%;'}

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }

  @media (max-width: 400px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;
