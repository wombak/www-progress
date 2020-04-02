import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../atoms";
import { colors } from "../../theme";

const FM_INITIAL = "initial";
const FM_APPEAR = "appear";
const FM_SPIN = "spin";
const FM_EXIT = "exit";

const variants = {
  [FM_INITIAL]: {
    opacity: 0
  },
  [FM_APPEAR]: {
    opacity: 1,
    transition: {
      duration: 1
    }
  },
  [FM_SPIN]: {
    rotate: 360,
    scale: 1.1,
    transition: {
      rotate: {
        loop: Infinity,
        ease: "linear",
        duration: 1.25
      },
      scale: {
        yoyo: Infinity,
        duration: 0.625
      }
    }
  },
  [FM_EXIT]: {
    opacity: 0
  }
};

const SIZE = 40;

const Wrap = styled(motion.div)`
  position: absolute;
  left: calc(50% - ${SIZE / 2}px);
  top: calc(50% - ${SIZE / 2}px);
`;

const Spinner = styled(Icon).attrs(() => ({ name: "spinner" }))`
  align-self: center;
  color: ${colors.light};
  width: ${SIZE}px;
`;

const LoadingIndicator = () => (
  <Wrap
    variants={variants}
    initial={FM_INITIAL}
    animate={[FM_APPEAR, FM_SPIN]}
    exit={FM_EXIT}
  >
    <Spinner />
  </Wrap>
);

export default LoadingIndicator;
