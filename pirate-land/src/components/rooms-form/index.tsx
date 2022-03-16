import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import Input from '../input';
import Button from '../button';

import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';
import {useBoardContext} from '../../contexts/board.context';
import {useLobbyContext} from '../../contexts/lobby.context';
import {usePlayContext} from '../../contexts/play.context';
import {useScoreboardContext} from '../../contexts/scoreboard.context';
import {useTeamChatContext} from '../../contexts/team-chat.context';
import {useWorldChatContext} from '../../contexts/world-chat.context';

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

export const ColTitle = styled.span`
  font-family: calibri;
  font-size: 4.2vh;
  opacity: 0.84;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
`;

interface RoomsFormProps {}

const RoomsForm: React.FC<RoomsFormProps> = () => {
    const {REST_API} = useAPIContext();
    const navigate = useNavigate();
    const {resetBoard} = useBoardContext();
    const {resetLobby} = useLobbyContext();
    const {resetPlay} = usePlayContext();
    const {resetTeamChat} = useTeamChatContext();
    const {resetWorldChat} = useWorldChatContext();
    const {resetScoreboard} = useScoreboardContext();
    const {token, setLoading} = useUserContext();
    const [roomId, setRoomId] = useState<string>('');

    useEffect(() => {
      resetBoard!();
      resetLobby!();
      resetPlay!();
      resetScoreboard!();
      resetTeamChat!();
      resetWorldChat!();
    }, []);

    const onJoin = () => {
      if (!roomId.length) return;
      axios.post(`${REST_API}/games/check_join`, {gameId: roomId},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        setLoading!(false);
        navigate(`../island/${data.gameId}/lobby`, { replace: true });
      })
      .catch((err) => {
        window.alert(JSON.stringify(err.response.data));
        setLoading!(false);
      });
    };
    
    const onCreate = () => {
      setLoading!(true);
      axios.post(`${REST_API}/games/create`, {},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        setLoading!(false);
        navigate(`../island/${data.gameId}/lobby`, { replace: true });
      })
      .catch(() => setLoading!(false));
    };

    return (
      <RoomContainer>
        <ColTitle>Islands</ColTitle>
        <Input
          label="Island ID"
          name="roomid"
          value={roomId}
          setValue={setRoomId}
        />
        <ButtonsContainer>
          <Button disabled={!roomId.length} text="Join Island" onPress={onJoin} />
          <Button
            text="Create Island"
            onPress={onCreate}
            variant={2}
          />
        </ButtonsContainer>
      </RoomContainer>
    );
};

export default RoomsForm;
