import React from 'react';
import { StyledButton } from './styles';
import LoadingSpinner from '../LoadingSpinner';

const Button = React.memo(({ children, isLoading, variant = 'primary', fullWidth = false, ...props }) => {
  return (
    <StyledButton 
      {...props} 
      disabled={isLoading} 
      $variant={variant} // using transient props here and below to avoid console warnings from styled components since both variand and fullWidth are not valid attributes
      $fullWidth={fullWidth}
    >
      {isLoading ? (
        <LoadingSpinner size="small" color={variant === 'reject' ? '#3A3A3A' : 'white'} />
      ) : (
        children
      )}
    </StyledButton>
  );
});

export default Button;
