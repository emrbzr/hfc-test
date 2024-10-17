import React from 'react';
import { SpinnerContainer, Spinner, SpinnerMessage } from './styles';

function LoadingSpinner({ message, size = 'medium', color = '#3498db' }) {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
      {message && <SpinnerMessage>{message}</SpinnerMessage>}
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
