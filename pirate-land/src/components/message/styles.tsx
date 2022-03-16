import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Sender = styled.span`
  font-family: bahnschrift;
  font-size: 1rem;
`;

export const Time = styled.span`
  font-family: bahnschrift;
  font-size: 0.7rem;
  opacity: 0.7;
  align-self: flex-end;
`;

export const Msg = styled.span`
  font-family: bahnschrift;
  font-size: 1rem;
  opacity: 0.8;
`;

export const VrtclLn = styled.span`
  border-bottom: 1px solid black;
  opacity: 0.7;
  margin-top: 2px;
  margin-bottom: 2px;
`;