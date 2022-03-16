import React from 'react';
import styled from 'styled-components';

import {TeamContainer, TeamTitle} from '../team';
import PlayerScoreboard, {PlayerContainer, PlayerText} from '../player-scrbrd';

import {useScoreboardContext, ScoreboardTeamProps} from '../../contexts/scoreboard.context';

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

interface TeamScoreBoardProps {
    teamName: string;
    variant: number;
}

const TeamScoreboard: React.FC<TeamScoreBoardProps> = ({teamName, variant}) => {
    const {team1, team2} = useScoreboardContext();
    const players: Array<ScoreboardTeamProps> = variant === 1 ? team1 : team2;
    return (
      <TeamContainer>
        <TeamTitle variant={variant}>{teamName}</TeamTitle>
        <PlayersContainer>
          <PlayerContainer>
            <span />
            <PlayerText>Pirate</PlayerText>
            <PlayerText>Player</PlayerText>
            <PlayerText>Captures</PlayerText>
            <PlayerText>Caught</PlayerText>
          </PlayerContainer>
          {players.map((item, idx) => (
            <PlayerScoreboard 
              key={idx} 
              variant={idx+1} 
              captures={item.captures} 
              caught={item.caught}
              id={item.pid}
            />
          ))}
        </PlayersContainer>
      </TeamContainer>
    );
};

export default TeamScoreboard;
