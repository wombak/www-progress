import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { CoolGrid, Footer, Header, Intro, StatsInterface } from "./components";
import AppContextProvider from "./context";

const Main = styled.main.attrs(({ hide = false }) => ({
  style: { opacity: !hide ? 1 : 0 }
}))`
  padding: 0;
  transition: opacity 0.1s ease;
  will-change: opacity;
`;

const App = () => {
  const [isUnloading, setIsUnloading] = useState(false);

  useEffect(() => {
    const onBeforeUnload = e => {
      const href = e?.target?.activeElement?.getAttribute("href");

      if (href && href.startsWith("mailto")) {
        return false;
      }

      setIsUnloading(true);
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return function cleanup() {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return (
    <AppContextProvider>
      <Main hide={isUnloading}>
        <Header />

        <Intro />

        <StatsInterface />

        <Footer />

        <CoolGrid />
      </Main>
    </AppContextProvider>
  );
};

export default App;
