import React from 'react';
import { StyledButton } from './styles';
import LoadingSpinner from '../LoadingSpinner';

const Button = React.memo(({ children, isLoading, variant = 'primary', fullWidth = false, ...props }) => {
  return (
    <StyledButton {...props} disabled={isLoading} variant={variant} fullWidth={fullWidth}>
      {isLoading ? (
        <LoadingSpinner size="small" color={variant === 'reject' ? '#3A3A3A' : 'white'} />
      ) : (
        children
      )}
    </StyledButton>
  );
});

export default Button;
