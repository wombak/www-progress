import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { AppContext } from "../../context";
import gifs from "../../gifs";
import { colors } from "../../theme";

import useRandomGrid, { COL_COUNT, ROW_COUNT } from "./useRandomGrid";

const gridVariants = {
  initial: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1
    }
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  initial: (scale) => ({ scale }),
  show: {
    scale: 1,
    transition: { type: "spring" }
  }
};

const Grid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${colors.dark};
    opacity: 0.15;
  }
`;

const Item = styled(motion.div)`
  width: ${100 / COL_COUNT}vw;
  height: ${100 / ROW_COUNT}vh;
  background: no-repeat center center / cover;
  background-image: ${({ gif = "" }) => `url(${gif})`};
`;

const CoolGrid = () => {
  const { ui } = useContext(AppContext);
  const gridItems = useRandomGrid(ui.showGifs);

  return (
    <AnimatePresence>
      {ui.showGifs && (
        <Grid
          variants={gridVariants}
          initial="initial"
          animate="show"
          exit="hide"
        >
          {gridItems.map(({ initialScale, url }) => (
            <Item
              custom={initialScale}
              variants={itemVariants}
              key={url}
              gif={url}
            />
          ))}
        </Grid>
      )}
    </AnimatePresence>
  );
};

export default CoolGrid;
