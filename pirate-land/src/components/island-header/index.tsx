import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';
import {usePlayContext} from '../../contexts/play.context';
import {useBoardContext} from '../../contexts/board.context';

import {Header, HeaderText, TitleText, RightContainer, CaptionText} from './styles';

interface IslandHeaderProps {
    gameId: string|undefined;
}

const IslandHeader: React.FC<IslandHeaderProps> = ({gameId}) => {
    const {REST_API} = useAPIContext();
    const {token} = useUserContext();
    const {currPlayer, players} = usePlayContext();
    const {clicks} = useBoardContext();
    const [username, setUsername] = useState<string>('-------');
    useEffect(() => {
      const playerId = players[currPlayer];
      if (!playerId?.length) return;
      axios.post(`${REST_API}/users/username`, {userId: playerId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(({data}) => setUsername(data.username));
    }, [currPlayer, players]);
    return (
      <Header>
        <HeaderText>{gameId}</HeaderText>
        <TitleText>Pirate Land</TitleText>
        <RightContainer>
          <HeaderText>{username}'s chance</HeaderText>
          <CaptionText>Clicks left: {clicks}</CaptionText>
        </RightContainer>
      </Header>
    );
};

export default IslandHeader;
