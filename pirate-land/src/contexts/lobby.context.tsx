import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

import {useUserContext} from './user.context';
import {useAPIContext} from './api.context';

interface LobbyContextInterface {
  id: string;
  creator: string;
  launched: boolean;
  team1: Array<string>;
  team2: Array<string>;
  currTeam: string;
  fetchGameForLobby?: (gameId: string) => void;
  resetLobby?: () => void;
}

const defaultState: LobbyContextInterface = {
    id: '',
    creator: '',
    launched: false,
    team1: [],
    team2: [],
    currTeam: '',
};

export const LobbyContext = createContext<LobbyContextInterface>(defaultState);

export const useLobbyContext = () => useContext(LobbyContext);

export const LobbyContextProivder: React.FC = ({children}) => {
    const {setLoading, token, id: uid} = useUserContext();
    const {REST_API} = useAPIContext();
    
    const [id, setId] = useState<string>(defaultState.id);
    const [creator, setCreator] = useState<string>(defaultState.creator);
    const [team1, setTeam1] = useState<Array<string>>(defaultState.team1);
    const [team2, setTeam2] = useState<Array<string>>(defaultState.team2);
    const [currTeam, setCurrTeam] = useState<string>(defaultState.currTeam);
    const [launched, setLaunched] = useState<boolean>(defaultState.launched);

    const fetchGameForLobby = (gameId: string) => {
        setLoading!(true);
        axios.post(`${REST_API}/games/for_lobby`, {gameId}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(({data}) => {
            setId(data.id);
            setCreator(data.creator);
            setLaunched(data.launched);
            setTeam1(data.team1);
            setTeam2(data.team2);
            const currentTeam = data.team1.includes(uid)
              ? "Team 1"
              : data.team2.includes(uid)
              ? "Team 2"
              : "";
            setCurrTeam(currentTeam);
            setLoading!(false);
        }).catch(() => setLoading!(false));
    };

    const resetLobby = () => {
      setId('');
      setCreator('');
      setTeam1([]);
      setTeam2([]);
      setCurrTeam('');
      setLaunched(false);
    };

    return (
        <LobbyContext.Provider value={{
            id, creator, team1, team2, currTeam, launched,
            fetchGameForLobby, resetLobby
        }}>{children}</LobbyContext.Provider>
    );
};
