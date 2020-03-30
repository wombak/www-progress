import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { WombakLogo } from "../atoms";

const HeaderWrap = styled(motion.header)`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
  transform-origin: top center;
`;

const Header = () => (
  <HeaderWrap
    initial={{ y: -40, scale: 0.8, opacity: 0 }}
    animate={{ y: 0, scale: 1, opacity: 1 }}
    transition={{ duration: 0.9 }}
  >
    <WombakLogo />
  </HeaderWrap>
);

export default Header;
