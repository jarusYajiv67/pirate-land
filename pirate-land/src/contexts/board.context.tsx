import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

import {useAPIContext} from './api.context';
import {useUserContext} from './user.context';
import {usePlayContext} from './play.context';

interface BoardContextInterface {
  mtyp: number;
  clicks: number;
  board: Array<number>;
  myTeam: Array<string>;
  fetchBoard?: (boardId: string) => void;
  setClicks?: (val: number) => void;
  setClicked?: (val: boolean) => void;
  resetBoard?: () => void;
  clicked: boolean;
}

const defaultState: BoardContextInterface = {
    mtyp: 0,
    clicks: 0,
    board: [],
    myTeam: [],
    clicked: false
};

export const BoardContext = createContext<BoardContextInterface>(defaultState);

export const useBoardContext = () => useContext(BoardContext);

export const BoardContextProvider: React.FC = ({children}) => {
    const {REST_API} = useAPIContext();
    const {token, setLoading, id} = useUserContext();
    const {currTeamId, initial} = usePlayContext();

    const [mtyp, setMtyp] = useState<number>(defaultState.mtyp);
    const [clicks, setClicks] = useState<number>(defaultState.clicks);
    const [board, setBoard] = useState<Array<number>>(defaultState.board);
    const [myTeam, setMyTeam] = useState<Array<string>>(defaultState.myTeam);
    const [clicked, setClicked] = useState<boolean>(defaultState.clicked);
    const [wasInitial, setWasInitial] = useState<boolean>(false);

    const fetchBoard = (boardId: string) => {
      setLoading!(true);
      const final = boardId.length > 0 ? boardId : currTeamId;
      axios.post(`${REST_API}/boards/get_board`, {boardId: final}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(({data}) => {
          setBoard(data.grid);
          setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    const fetchTeam = (teamId: string) => {
        setLoading!(true);
        axios.post(`${REST_API}/teams/get_players`, {teamId}, {
          headers: {
            Authorization: `Bearer ${token}`,
        }}).then(({data}) => {
          const players: Array<string> = data.players;
          setMtyp(players.indexOf(id) + 1);
          setMyTeam(players);
          setLoading!(false);
        }).catch(() => setLoading!(false));
    };

    const resetBoard = () => {
      setMtyp(0);
      setClicks(0);
      setBoard([]);
      setMyTeam([]);
      setWasInitial(false);
      setClicked(false);
    };

    useEffect(() => {
        if (!currTeamId.length) return;
        if (board.length) return;
        fetchBoard(currTeamId);
    }, [currTeamId]);
    
    useEffect(() => {
        if (!currTeamId.length) return;
        if (myTeam.length) return;
        fetchTeam(currTeamId);
    }, [currTeamId]);

    useEffect(() => {
        if (initial && !wasInitial) {
            setWasInitial(true);
            setClicks(3);
        } else setClicks(1);
    }, [initial]);

    return (
        <BoardContext.Provider
          value={{
            mtyp, clicks, board, myTeam, clicked,
            fetchBoard, setClicks, resetBoard, setClicked
          }}
        >{children}</BoardContext.Provider>
    );
};