import React, {useState} from 'react';
import styled from 'styled-components';

import {pirateMapper} from '../player';

import {useLobbyContext} from '../../contexts/lobby.context';

const TeamPlayersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  margin-left: 1rem;
`;

const TeamPlayer = styled.img.attrs({
  alt: "",
})`
  width: 80%;
  height: 80%;
`;

interface TeamPlayersProps {
  team: number;
}

const TeamPlayers: React.FC<TeamPlayersProps> = ({team}) => {
    const {team1, team2} = useLobbyContext();
    const players: Array<string> = team === 1 ? team1 : team2;
    return (
      <TeamPlayersContainer>
        {players.map((_, idx) => <TeamPlayer key={idx} src={pirateMapper[idx+1]} />)}
      </TeamPlayersContainer>
    );
};

export default TeamPlayers;
