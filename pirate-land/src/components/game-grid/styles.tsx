import styled from 'styled-components';

import level1 from '../../assets/lands/f3.png';
import {pirateMapper} from '../player';

export const Grid = styled.div`
  height: 80vh;
  background-image: url(${level1});
  background-size: cover;
  z-index: 500;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(15, 1fr);
  border-bottom: 2px solid black;
  gap: 1px;
`;

export const Box = styled.div<{ player: number; avail: boolean }>`
  background-size: cover;
  border-radius: 0.3rem;
  ${(props) =>
    props.player !== 0 && `background-image: url(${pirateMapper[Math.abs(props.player)]});`}
  background-size: cover;
  cursor: pointer;
  ${(props) => props.avail && `cursor: not-allowed;`}
  ${(props) =>
    props.player < 0 && `background-color: rgba(0, 0, 0, 0.7);`}
  &:hover {
    ${(props) => props.player === 0 && `background-color: rgba(0, 0, 0, 0.21);`}
  }
`;