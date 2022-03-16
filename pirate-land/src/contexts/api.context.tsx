import React, {createContext, useContext} from 'react';

interface APIContextInterface {
  REST_API: string;
  SOCKET: string;
}

const defaultState: APIContextInterface = {
  REST_API: "SERVER_ADDRESS:PORT/api",
  SOCKET: "SERVER_ADDRESS:PORT",
};

export const APIContext = createContext<APIContextInterface>(defaultState);

export const useAPIContext = () => useContext(APIContext);

export const APIContextProvider: React.FC = ({children}) => {
  return (
    <APIContext.Provider value={defaultState}>{children}</APIContext.Provider>
  );
};