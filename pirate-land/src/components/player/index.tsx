import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import pirate1 from '../../assets/pirates/face-1.png';
import pirate2 from '../../assets/pirates/face-2.png';
import pirate3 from '../../assets/pirates/face-3.png';
import pirate4 from '../../assets/pirates/face-4.png';

import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

export const pirateMapper: {[key:string]: string} = {
    1: pirate1,
    2: pirate2,
    3: pirate3,
    4: pirate4,
};

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerImage = styled.img.attrs({
    alt: ''
})`
  width: 60%;
  height: 60%;
`;

const PlayerName = styled.span`
  font-family: bahnschrift;
  font-size: 1.4rem;
  opacity: 0.7;
`;

interface PlayerProps {
    id: string;
    variant: number;
}

const Player: React.FC<PlayerProps> = ({variant, id}) => {
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
            <PlayerName>{name}</PlayerName>
        </PlayerContainer>
    );
};

export default Player;
