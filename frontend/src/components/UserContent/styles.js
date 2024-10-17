import styled from 'styled-components';

export const UserContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContentItem = styled.div`
  background-color: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 351px;
  height: 461px;
  display: flex;
  flex-direction: column;

  @media (max-width: 400px) {
    width: 100%;
    height: auto;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 351px;
  padding: 10px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }

  @media (max-width: 400px) {
    height: 0;
    padding-bottom: 100%; // Maintain aspect ratio
  }
`;

export const StatusBadge = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 9px 13px;
  border-radius: 37px;
  font-size: 13px;
  font-weight: bold;
  color: #242F57;
  text-transform: uppercase;
  background-color: ${({ status }) => 
    status === 'approved' ? '#D6F559' : 
    status === 'rejected' ? '#FF8686' : 
    status === 'pending' ? '#FFF186' : '#FFFFFF'};
`;

export const Title = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 400;
`;

export const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background: #C0C6FD;
  margin: 10px auto 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 24px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
