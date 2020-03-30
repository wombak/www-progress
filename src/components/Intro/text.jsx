import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../theme";

const textBase = css`
  color: ${colors.light};
  text-align: center;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
  position: relative;
`;

export const Title = styled(motion.h1).attrs(() => ({
  animate: { scale: 1, opacity: 1 },
  initial: { scale: 0.9, opacity: 0 },
  transition: { duration: 1 }
}))`
  ${textBase}
  font-weight: normal;
  font-size: 80px;
  line-height: 0.85;
`;

export const Subtitle = styled(motion.h4).attrs(() => ({
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.7, delay: 0.3 }
}))`
  ${textBase}
  font-weight: normal;
  width: 50%;
  margin: 30px auto 0;
  font-size: 15px;
  line-height: 1.8;
`;

const emojiCursor =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🤙</text></svg>"; // emojicursor.app

export const CoolLabel = styled.em`
  display: inline-block;
  font-style: italic;
  text-decoration: underline;
  color: ${colors.primary};
  cursor: url("${emojiCursor}") 16 16, auto;
`;
