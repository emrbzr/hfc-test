import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  border: ${props => props.size === 'small' ? '2px' : '4px'} solid #f3f3f3;
  border-top: ${props => props.size === 'small' ? '2px' : '4px'} solid ${props => props.color};
  border-radius: 50%;
  width: ${props => props.size === 'small' ? '20px' : '40px'};
  height: ${props => props.size === 'small' ? '20px' : '40px'};
  animation: ${spin} 1s linear infinite;
`;

export const SpinnerMessage = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
  text-align: center;
`;
