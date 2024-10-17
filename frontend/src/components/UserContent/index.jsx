import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContentContainer, ContentItem, ImageContainer, StatusBadge, Title, ButtonContainer, Divider, ErrorMessage } from './styles';
import Button from '../Button';
import { updateContentStatus } from '../../redux/actions/user-actions';

function UserContent({ users }) {
  const dispatch = useDispatch();
  const userContentState = useSelector(state => state.userContent);

  const updatingContentStatus = useMemo(() => userContentState.updatingContentStatus || {}, [userContentState.updatingContentStatus]);
  const updateErrors = useMemo(() => userContentState.updateErrors || {}, [userContentState.updateErrors]);

  const handleApprove = useCallback((id) => {
    dispatch(updateContentStatus(id, 'approved'));
  }, [dispatch]);

  const handleReject = useCallback((id) => {
    dispatch(updateContentStatus(id, 'rejected'));
  }, [dispatch]);

  const renderButtonsBasedOnStatus = useCallback((user, isUpdating, rejectText, approveText) => {
    switch (user?.status?.toUpperCase()) {
      case 'PENDING':
        return (
          <>
            <Button 
              onClick={() => handleReject(user.id)} 
              variant="reject"
              isLoading={isUpdating}
            >
              {rejectText}
            </Button>
            <Button 
              onClick={() => handleApprove(user.id)} 
              isLoading={isUpdating}
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
            isLoading={isUpdating}
          >
            {rejectText}
          </Button>
        );
      case 'REJECTED':
        return (
          <Button 
            onClick={() => handleApprove(user.id)} 
            fullWidth
            isLoading={isUpdating}
          >
            {approveText}
          </Button>
        );
      default:
        return null;
    }
  }, [handleApprove, handleReject]);

  const renderButtons = useCallback((user) => {
    const rejectText = 'REJECT';
    const approveText = 'APPROVE';
    const isUpdating = updatingContentStatus[user.id] || false;
    const error = updateErrors[user.id];

    return (
      <>
        {renderButtonsBasedOnStatus(user, isUpdating, rejectText, approveText)}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }, [renderButtonsBasedOnStatus, updatingContentStatus, updateErrors]);

  return (
    <UserContentContainer>
      {users.map((user) => (
        <ContentItem key={user.id}>
          <ImageContainer>
            <img 
              src={user.url} 
              alt={user.title} 
              loading="lazy" 
            />
            <StatusBadge $status={user.status}>{user.status}</StatusBadge>
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
