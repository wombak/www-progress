import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Mouse } from "@styled-icons/material/Mouse";

import { colors } from "../../theme";

const scrollIconStates = {
  initial: { opacity: 0, y: 18 },
  appear: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 1.2 }
  },
  hover: { scale: 1.2 },
  tap: { scale: 1.1 }
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

const MouseIcon = styled(Mouse)`
  width: 32px;
  color: ${colors.light};
`;

const ScrollIcon = props => (
  <IconWrap
    variants={scrollIconStates}
    initial="initial"
    animate="appear"
    whileHover="hover"
    whileTap="tap"
    transition={{ type: "spring" }}
    {...props}
  >
    <MouseIcon />
  </IconWrap>
);

export default ScrollIcon;
