import React from 'react';
import { UserContentContainer, ContentItem, ImageContainer, StatusBadge, Title, ButtonContainer, Divider } from './styles';
import Button from '../Button';

function UserContent({ content }) {
  const handleApprove = (id) => {
    
  };

  const handleReject = (id) => {
    
  };

  const renderButtons = (user) => {
    const rejectText = 'REJECT';
    const approveText = 'APPROVE';
    switch (user?.status.toUpperCase()) {
      case 'PENDING':
        return (
          <>
            <Button 
              onClick={() => handleReject(user.id)} 
              variant="reject"
            >
              {rejectText}
            </Button>
            <Button 
              onClick={() => handleApprove(user.id)} 
            >
              {approveText}
            </Button>
          </>
        );
      case 'APPROVED':
        return (
          <Button 
            onClick={() => handleReject(user.id)} 
            variant="reject"
            fullWidth
          >
            {rejectText}
          </Button>
        );
      case 'REJECTED':
        return (
          <Button 
            onClick={() => handleApprove(user.id)} 
            fullWidth
          >
            {approveText}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <UserContentContainer>
      {content.map((user) => (
        <ContentItem key={user.id}>
          <ImageContainer>
            <img 
              src={user.url} 
              alt={user.title} 
              loading="lazy" 
            />
            <StatusBadge status={user.status}>{user.status}</StatusBadge>
            <Title>{user.title}</Title>
          </ImageContainer>
          <Divider />
          <ButtonContainer>
            {renderButtons(user)}
          </ButtonContainer>
        </ContentItem>
      ))}
    </UserContentContainer>
  );
}

export default React.memo(UserContent);
