import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { colors } from "../../theme";

const FM_INITIAL = "initial";
const FM_APPEAR = "appear";
const FM_HOVER = "hover";
const FM_EXIT = "exit";

const barVariants = {
  [FM_APPEAR]: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const blockVariants = {
  [FM_INITIAL]: {
    opacity: 0,
    rotateX: 90,
    boxShadow: "0 4px 8px rgba(11, 11, 11, 0.15)",
    zIndex: 2,
    transitionEnd: {
      boxShadow: "0 4px 8px rgba(11, 11, 11, 0)",
      zIndex: 1
    }
  },
  [FM_APPEAR]: {
    opacity: 1,
    rotateX: 0,
    transition: { type: "spring" }
  },
  [FM_HOVER]: {
    rotateX: 20,
    boxShadow: "0 4px 8px rgba(11, 11, 11, 0.15)",
    zIndex: 2,
    transition: { type: "spring" }
  },
  [FM_EXIT]: {
    opacity: 0
  }
};

const ProgressBarWrap = styled(motion.div)`
  display: flex;
  width: 72.5%;
  height: 15%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateZ(40px);
  background: red;
  box-shadow: 0 1px 10px 0 rgba(11, 11, 11, 0.35);
  background: rgba(255, 255, 255, 0.4);
  perspective: 100vw;
`;

const ProgressBlock = styled(motion.div)`
  height: 100%;
  transform-origin: top center;

  ${({ bg = 255, blockWidth = 0 }) => `
    width: ${blockWidth}%;
    background: rgb(${bg}, ${bg}, ${bg});
  `}
`;

const ProgressLabel = styled.span`
  font-weight: bold;
  font-size: 18px;
  line-height: 1;
  color: ${colors.light};
  text-align: center;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) translateZ(20px);
  user-select: none;
  pointer-events: none;
  padding: 3px 6px;
  background: rgba(11, 11, 11, 0.4);
  text-shadow: 0 1px 4px rgba(11, 11, 11, 0.35);
  box-shadow: 0 1px 4px rgba(11, 11, 11, 0.1);
`;

const ProgressBar = ({ completeIssues = 0, totalIssues = 0 }) => {
  const blockWidth = 100 / totalIssues;
  const [ref, inView] = useInView();

  return (
    <ProgressBarWrap
      ref={ref}
      variants={barVariants}
      initial={FM_INITIAL}
      animate={inView ? FM_APPEAR : FM_EXIT}
    >
      {Array.from(Array(completeIssues).keys()).map((i) => {
        const bg = 255 - 100 + (100 / totalIssues) * (i + 1);

        return (
          <ProgressBlock
            key={i}
            variants={blockVariants}
            whileHover={FM_HOVER}
            bg={bg}
            blockWidth={blockWidth}
          />
        );
      })}

      <ProgressLabel>
        {completeIssues}/{totalIssues}
      </ProgressLabel>
    </ProgressBarWrap>
  );
};

export default ProgressBar;
