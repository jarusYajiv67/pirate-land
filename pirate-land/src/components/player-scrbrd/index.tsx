import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {pirateMapper} from '../player';
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PlayerImage = styled.img.attrs({
  alt: "",
})`
  width: 14%;
  height: 14%;
`;

export const PlayerText = styled.span`
  font-family: bahnschrift;
  font-size: 1.4rem;
  opacity: 0.7;
`;

interface PlayerScoreboardProps {
  id: string;
  captures: number;
  caught: number;
  variant: number;
}

const PlayerScoreboard: React.FC<PlayerScoreboardProps> = ({id, captures, caught, variant}) => {
    const {REST_API} = useAPIContext();
    const {token} = useUserContext();
    const [name, setName] = useState<string>('-------');
    useEffect(() => {
      axios.post(`${REST_API}/users/name`, {userId: id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => setName(data.name))
      .catch(console.log);
    }, []);
    return (
        <PlayerContainer>
            <PlayerImage src={pirateMapper[variant]} />
            <PlayerText>{name}</PlayerText>
            <PlayerText>{captures}</PlayerText>
            <PlayerText>{caught}</PlayerText>
        </PlayerContainer>
    );
};

export default PlayerScoreboard;
