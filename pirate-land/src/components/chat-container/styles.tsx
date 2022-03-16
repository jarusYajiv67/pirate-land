import styled from "styled-components";

export const ChatsContainer = styled.div<{ variant: number }>`
  border: 3px solid ${(props) => (props.variant === 1 ? `#2e66df` : `#fe0002`)};
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
`;

export const ChatsTitle = styled.span<{ variant: number }>`
  font-family: calibri;
  font-size: 3.6vh;
  color: ${(props) => (props.variant === 1 ? `#2e66df` : `#fe0002`)};
  text-align: center;
`;

export const MessagesContainer = styled.div`
  padding: 0px 6px;
  overflow-y: scroll;
  height: 80vh;
  max-height: 80vh;
`;

export const LoadMore = styled.span`
  font-family: calibri;
  font-size: 0.8rem;
  border: 1.2px dashed black;
  border-radius: 3px;
  cursor: pointer;
`;
