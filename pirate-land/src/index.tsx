import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import {APIContextProvider} from './contexts/api.context';
import {UserContextProvider} from './contexts/user.context';
import {SocketContextProvider} from './contexts/socket.context';
import {ScoreboardContextProvider} from './contexts/scoreboard.context';
import {LobbyContextProivder} from './contexts/lobby.context';
import {PlayContextProvider} from './contexts/play.context';
import {BoardContextProvider} from './contexts/board.context';
import {TeamChatContextProvider} from './contexts/team-chat.context';
import {WorldChatContextProvider} from './contexts/world-chat.context';

ReactDOM.render(
  <React.StrictMode>
    <APIContextProvider>
      <UserContextProvider>
        <SocketContextProvider>
          <ScoreboardContextProvider>
            <LobbyContextProivder>
              <PlayContextProvider>
                <BoardContextProvider>
                  <TeamChatContextProvider>
                    <WorldChatContextProvider>
                      <App />
                    </WorldChatContextProvider>
                  </TeamChatContextProvider>
                </BoardContextProvider>
              </PlayContextProvider>
            </LobbyContextProivder>
          </ScoreboardContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </APIContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
