import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {RecordContainer, GamesHolder, EndBar} from "./styles";
import {ColTitle} from '../rooms-form';

import RecordItem from '../record-item';
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

interface GamesRecordProps {}

const GamesRecord: React.FC<GamesRecordProps> = () => {
    const {REST_API} = useAPIContext();
    const {id, token, setLoading} = useUserContext();
    const [games, setGames] = useState<Array<string>>([]);

    useEffect(() => {
      setLoading!(true);
      axios.post(`${REST_API}/users/games`, {id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({data}) => {
        setGames(data.games || []);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    }, []);

    const visited: Array<string> = [];
    const final: Array<string> = [];
    for (let game of games) {
      if (visited.includes(game)) continue;
      final.push(game);
      visited.push(game);
    }

    return (
      <RecordContainer>
        <ColTitle>Games Record</ColTitle>
        <GamesHolder>
          {final.length > 0 ? (
            final.reverse().map((game, idx) => <RecordItem key={idx} id={game} />)
          ) : (
            <EndBar>No games played yet</EndBar>
          )}
        </GamesHolder>
      </RecordContainer>
    );
};

export default GamesRecord;
