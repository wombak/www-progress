import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../theme";

const Base = styled(motion.div)`
  width: 190px;
  height: 190px;
  background-color: ${colors.primary};
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0 2px 20px 0 rgba(11, 11, 11, 0.5);
`;

export default Base;
