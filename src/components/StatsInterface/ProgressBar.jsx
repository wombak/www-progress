import React from "react";
import styled from "styled-components";
import { motion, useTransform, useViewportScroll } from "framer-motion";

import { colors } from "../../theme";

const ProgressBarWrap = styled.div`
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
`;

const ProgressBlock = styled(motion.div)`
  height: 100%;
  background: ${colors.light};
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: ${colors.dark};
  }

  ${({ blockOpacity = 0, blockWidth = 0 }) => `
    width: ${blockWidth}%;

    &::after {
      opacity: ${blockOpacity};
    }
  `}
`;

const ProgressMarker = styled.span`
  width: 1.9%;
  height: 112%;
  position: absolute;
  left: 0;
  top: -6%;
  transform: translateX(-50%);
  background: ${colors.primary};
  box-shadow: 0 0 10px 0 rgba(35, 35, 35, 0.15);
`;

const ProgressLabel = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.light};
  text-align: right;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

const ProgressBar = ({ completeIssues = 0, totalIssues = 0 }) => {
  const blockWidth = 100 / totalIssues;

  return (
    <ProgressBarWrap>
      {Array.from(Array(completeIssues).keys()).map(i => {
        const opacity = (1 / totalIssues) * i;

        return (
          <ProgressBlock
            key={i}
            blockOpacity={opacity}
            blockWidth={blockWidth}
          />
        );
      })}

      {completeIssues > 0 && (
        <ProgressMarker style={{ left: `${blockWidth * completeIssues}%` }} />
      )}

      <ProgressLabel>
        {completeIssues}/{totalIssues}
      </ProgressLabel>
    </ProgressBarWrap>
  );
};

export default ProgressBar;
