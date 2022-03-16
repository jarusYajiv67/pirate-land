import styled from 'styled-components';

export const HomeContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  font-family: "PirateKids";
  font-size: 12vh;
  color: #e61d30;
  -webkit-text-stroke-width: 2.8px;
  -webkit-text-stroke-color: #354b7d;
`;

export const FormContainer = styled.div`
  display: flex;
`;

export const VerticalLine = styled.span`
  border-left: 3px solid #354b7d;
  border-radius: 2rem;
`;
