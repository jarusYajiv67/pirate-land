import React, {createContext, useContext} from 'react';

interface APIContextInterface {
  REST_API: string;
  SOCKET: string;
}

const defaultState: APIContextInterface = {
  REST_API: "https://pirate-land-server.herokuapp.com/api",
  SOCKET: "https://pirate-land-server.herokuapp.com",
};

export const APIContext = createContext<APIContextInterface>(defaultState);

export const useAPIContext = () => useContext(APIContext);

export const APIContextProvider: React.FC = ({children}) => {
  return (
    <APIContext.Provider value={defaultState}>{children}</APIContext.Provider>
  );
};