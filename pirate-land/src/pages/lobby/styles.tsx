import styled from 'styled-components';

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const TitleText = styled.span`
  font-family: "PirateKids";
  font-size: 10vh;
  color: #e61d30;
  -webkit-text-stroke-width: 2.8px;
  -webkit-text-stroke-color: #354b7d;
`;

export const GameId = styled.span`
  font-family: bahnschrift;
  font-size: 1.4rem;
  opacity: 0.6;
`;

export const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0fr 1fr;
  align-items: center;
`;

export const VrtclLn = styled.div`
  border-left: 3px solid black;
  border-radius: 2rem;
  opacity: 0.7;
  height: 91%;
`;

export const LaunchContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 2%;
`;
