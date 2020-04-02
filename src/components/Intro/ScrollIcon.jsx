import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../atoms";
import { colors } from "../../theme";

const FM_INITIAL = "initial";
const FM_APPEAR = "appear";
const FM_HOVER = "hover";
const FM_TAP = "tap";

const variants = {
  [FM_INITIAL]: { opacity: 0, y: 18 },
  [FM_APPEAR]: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 1.2 }
  },
  [FM_HOVER]: { scale: 1.2 },
  [FM_TAP]: { scale: 1.1 }
};

const IconWrap = styled(motion.button)`
  position: absolute;
  bottom: 32px;
  left: calc(50% - 16px);
  appearance: none;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  z-index: 5;
`;

const MouseIcon = styled(Icon).attrs(() => ({ name: "mouse" }))`
  width: 32px;
  color: ${colors.light};
`;

const ScrollIcon = (props) => (
  <IconWrap
    {...props}
    variants={variants}
    initial={FM_INITIAL}
    animate={FM_APPEAR}
    whileHover={FM_HOVER}
    whileTap={FM_TAP}
    transition={{ type: "spring" }}
  >
    <MouseIcon />
  </IconWrap>
);

export default ScrollIcon;
