import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { WombakLogo } from "../atoms";

const FM_INITIAL = "initial";
const FM_APPEAR = "appear";

const variants = {
  [FM_INITIAL]: { y: -40, scale: 0.8, opacity: 0 },
  [FM_APPEAR]: { y: 0, scale: 1, opacity: 1 }
};

const transition = { duration: 0.9 };

const HeaderWrap = styled(motion.header)`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  transform-origin: top center;
`;

const Header = () => (
  <HeaderWrap
    variants={variants}
    initial={FM_INITIAL}
    animate={FM_APPEAR}
    transition={transition}
  >
    <WombakLogo />
  </HeaderWrap>
);

export default Header;
