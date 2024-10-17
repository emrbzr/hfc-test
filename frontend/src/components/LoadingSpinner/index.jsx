import React from 'react';
import { SpinnerContainer, Spinner, SpinnerMessage } from './styles';

function LoadingSpinner({ message }) {
  return (
    <SpinnerContainer>
      <Spinner />
      {message && <SpinnerMessage>{message}</SpinnerMessage>}
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
