import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../button';
import Player from '../player';

import {useLobbyContext} from '../../contexts/lobby.context';
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';
import {useSocketContext} from '../../contexts/socket.context';

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const TeamTitle = styled.div<{ variant: number }>`
  font-family: calibri;
  font-size: 2.4rem;
  color: #567ace;
  ${(props) => props.variant === 2 && `color: #e61d30;`};
`;

const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
`;

interface TeamProps {
  teamName: string;
  variant: number;
}

const Team: React.FC<TeamProps> = ({teamName, variant}) => {
  const {team1, team2, currTeam, id: gameId, fetchGameForLobby} = useLobbyContext();
  const {REST_API} = useAPIContext();
  const {token, setLoading} = useUserContext();
  const {socket} = useSocketContext();

  const players: Array<string> = teamName === "Team 1" ? team1 : team2;
  const joinButton = async () => {
    if (currTeam === teamName) return;
    setLoading!(true);
    try {
      if (currTeam.length > 0) {
        await axios.put(`${REST_API}/games/leave_team`, {gameId, teamNo: currTeam}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      }
      await axios.put(`${REST_API}/games/join_team`, {gameId, teamNo: teamName}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchGameForLobby!(gameId);
      socket?.emit("updateRoom", `LOBBY:${gameId}`);
    } catch (err) {window.alert(err);}
  };
  return (
    <TeamContainer>
      <TeamTitle variant={variant}>{teamName}</TeamTitle>
      <PlayersContainer>
        {players.map((val, idx) => (
          <Player key={idx} variant={idx + 1} id={val} />
        ))}
      </PlayersContainer>
      <Button
        disabled={currTeam === teamName || players.length === 4}
        variant={variant}
        text={`Join ${teamName}`}
        onPress={joinButton}
      />
    </TeamContainer>
  );
};

export default Team;
