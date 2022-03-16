import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0rem 0.6rem;
`;

export const HeaderText = styled.span`
  font-family: calibri;
  font-size: 3.6vh;
  opacity: 0.7;
`;

export const TitleText = styled.span`
  font-family: "PirateKids";
  font-size: 6.3vh;
  color: #e61d30;
  -webkit-text-stroke-width: 2.1px;
  -webkit-text-stroke-color: #354b7d;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CaptionText = styled.span`
  align-self: flex-end;
  font-family: bahnschrift;
  font-size: 2.4vh;
  opacity: 0.7;
`;