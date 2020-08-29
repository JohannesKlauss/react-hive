import React from "react";
import {RecoilValueReadOnly} from "recoil/dist";

type HiveRootContextValue = {
  url?: string;
  cache: Map<string, RecoilValueReadOnly<unknown>>;
};

export const HiveRootContext = React.createContext<HiveRootContextValue>({
  cache: new Map(),
});

const cache = new Map();

interface Props {
  url: string;
}

export const HiveRoot: React.FC<Props> = ({children, url}) => {
  return (
    <HiveRootContext.Provider value={{
      cache,
      url,
    }}>
      {children}
    </HiveRootContext.Provider>
  )
};