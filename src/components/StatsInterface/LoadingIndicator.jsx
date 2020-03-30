import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Spinner3 } from "@styled-icons/evil/Spinner3";

import { colors } from "../../theme";

const SIZE = 40;

const variants = {
  initial: {
    opacity: 0
  },
  appear: {
    opacity: 1,
    transition: {
      duration: 1
    }
  },
  spin: {
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
  exit: {
    opacity: 0
  }
};

const Wrap = styled(motion.div)`
  position: absolute;
  left: calc(50% - ${SIZE / 2}px);
  top: calc(50% - ${SIZE / 2}px);
`;

const Spinner = styled(Spinner3)`
  align-self: center;
  color: ${colors.light};
  width: ${SIZE}px;
`;

const LoadingIndicator = () => (
  <Wrap
    variants={variants}
    initial="initial"
    animate={["appear", "spin"]}
    exit="exit"
  >
    <Spinner />
  </Wrap>
);

export default LoadingIndicator;
