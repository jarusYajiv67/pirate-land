import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

import {useAPIContext} from '../contexts/api.context';
import {useUserContext} from '../contexts/user.context';

export interface ScoreboardTeamProps {
    pid: string;
    captures: number;
    caught: number;
}

interface ScoreboardContextInterface {
  team1: Array<ScoreboardTeamProps>;
  team2: Array<ScoreboardTeamProps>;
  loading: boolean;
  setTeam1?: (val: Array<ScoreboardTeamProps>) => void;
  setTeam2?: (val: Array<ScoreboardTeamProps>) => void;
  setLoading?: (val: boolean) => void;
  fetchScoreboard?: (val: string) => void;
  resetScoreboard?: () => void;
}

const defaultState: ScoreboardContextInterface = {
    team1: [],
    team2: [],
    loading: false
};

export const ScoreboardContext = createContext<ScoreboardContextInterface>(defaultState);

export const useScoreboardContext = () => useContext(ScoreboardContext);

export const ScoreboardContextProvider: React.FC = ({children}) => {
    const {REST_API} = useAPIContext();
    const {token, setLoading: slu} = useUserContext();

    const [team1, setTeam1] = useState<Array<ScoreboardTeamProps>>(defaultState.team1);
    const [team2, setTeam2] = useState<Array<ScoreboardTeamProps>>(defaultState.team2);
    const [loading, setLoading] = useState<boolean>(defaultState.loading);

    const fetchScoreboard = (gameId: string) => {
        slu!(true);
        axios.post(`${REST_API}/scoreboard/get_score`, {gameId}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(({data}) => {
            slu!(false);
            setTeam1(data.team1);
            setTeam2(data.team2);
        }).catch(() => slu!(false));
    };

    const resetScoreboard = () => {
        setTeam1([]);
        setTeam2([]);
    };
    
    return (
        <ScoreboardContext.Provider value={{
            team1, team2, loading,
            setTeam1, setTeam2, setLoading,
            fetchScoreboard, resetScoreboard
        }}>{children}</ScoreboardContext.Provider>
    );
};
