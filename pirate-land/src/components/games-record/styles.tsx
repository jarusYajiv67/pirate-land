import styled from 'styled-components';

export const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

export const GamesHolder = styled.div`
  border: 2.1px dashed black;
  opacity: 0.84;
  border-radius: 0.2rem;
  padding: 0.7rem;
  max-height: 42vh;
  overflow-y: scroll;
`;

export const EndBar = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 7px;
  align-self: center;
`;
