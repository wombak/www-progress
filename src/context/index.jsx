import React from "react";

import useGithub from "./github";
import useUi from "./ui";

export const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
  const github = useGithub();
  const ui = useUi();

  const providerValues = {
    github,
    ui
  };

  return (
    <AppContext.Provider value={providerValues}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
