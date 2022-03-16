import React from 'react';
import axios from 'axios';

import {Grid, Box} from './styles';

import {useAPIContext} from '../../contexts/api.context';
import {useBoardContext} from '../../contexts/board.context';
import {usePlayContext} from '../../contexts/play.context';
import {useUserContext} from '../../contexts/user.context';
import {useSocketContext} from '../../contexts/socket.context';
import {useLobbyContext} from '../../contexts/lobby.context';
import {useScoreboardContext} from '../../contexts/scoreboard.context';

import {playSound} from '../../utils/play-sound';

interface GameGridProps {}

const GameGrid: React.FC<GameGridProps> = () => {
    const {REST_API} = useAPIContext();
    const {socket} = useSocketContext();
    const {id: gameId, currTeam} = useLobbyContext();
    const {board, clicks, setClicks, fetchBoard, mtyp, setClicked} = useBoardContext();
    const {currPlayer, players, currTeamId , oppTeamId, initial, updateChance} = usePlayContext();
    const {id, setLoading, token} = useUserContext();
    const {fetchScoreboard} = useScoreboardContext();

    const onBoxClick = async (player: number, typ: number, idx: number) => {
      if (player !== 0) return;
      if (id !== players[currPlayer]) return window.alert(`Not your chance`);
      setClicked!(true);
      playSound("pirate", false);
      // game started, update on enemy board as well
      if (!initial) {
        try {
          setLoading!(true);
          // make the move
          const rb = {currTeamId, oppTeamId, gameId, currTeam, mTyp: mtyp, idx};
          const {data} =  await axios.put(`${REST_API}/boards/make_move`, {...rb}, {
            headers: {Authorization: `Bearer ${token}`},
          });
          if (data === "hit") {
            // update the board for all teams
            fetchBoard!(currTeamId);
            fetchScoreboard!(gameId);
            socket?.emit("updtBrd", `LOBBY:${gameId}`);
          }
          // update the chance
          await axios.put(
            `${REST_API}/games/update_chance`,
            { gameId },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          updateChance!();
          socket?.emit("updateChance", `LOBBY:${gameId}`);
          setLoading!(false);
        } catch (err) {
          window.alert(err);
          setLoading!(false);
        };
        return;
      }
      // else, update the team board
      try {
        setLoading!(true);
        const reqBody = { currTeamId, typ, idx, oppTeamId, initial };
        // update the board
        await axios.put(
          `${REST_API}/boards/update_board`,
          { ...reqBody },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchBoard!(currTeamId);
        // if initial update only team
        if (initial) socket?.emit("updateBoard", currTeamId);
        // else update everyone
        else socket?.emit("updateBoard", `LOBBY:${gameId}`);
        setClicks!(clicks - 1);
        setLoading!(false);
      } catch (err) {
        setLoading!(false);
      }
      // if no more clicks, switch the chance
      if (clicks === 1) {
        await axios.put(
          `${REST_API}/games/update_chance`,
          { gameId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        updateChance!();
        socket?.emit("updateChance", `LOBBY:${gameId}`);
        return;
      }
    };

    return (
      <Grid>
        {board.map((val, idx) => (
          <Box
            onClick={() => onBoxClick(val, mtyp, idx)}
            avail={val !== 0}
            player={val}
            key={idx}
          />
        ))}
      </Grid>
    );
};

export default GameGrid;
