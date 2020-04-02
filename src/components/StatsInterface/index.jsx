import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  useTransform,
  useViewportScroll,
  useSpring
} from "framer-motion";
import useDimensions from "react-use-dimensions";

import { Button, Container } from "../../atoms";
import { AppContext } from "../../context";
import { urls } from "../../utils";
import { colors } from "../../theme";

import { IssuesSquare, MetaSquare } from "./DataSquares";
import LoadingIndicator from "./LoadingIndicator";
import ProgressBar from "./ProgressBar";

const OuterWrap = styled(motion.div)`
  height: 100vh;
  min-height: 780px;
  perspective: 90vw;
  padding: 0 20px;
  position: relative;
`;

const InnerContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  max-width: calc(100% - 68px);
`;

const ModuleWrap = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
`;

const ModuleBg = styled.div`
  width: 100%;
  background: rgba(24, 24, 24, 0.9);
  box-shadow: 0 2px 20px 0 rgba(11, 11, 11, 0.5);
  position: relative;
  z-index: 3;

  &::after {
    content: "";
    display: block;
    padding-bottom: 35%;
  }
`;

const BgCutout = styled.div`
  position: absolute;
  width: 82.5%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.dark};
  box-shadow: inset 0 10px 20px 0 rgba(26, 26, 26, 0.5);
`;

const TopButtonArea = styled.div`
  position: absolute;
  right: 10px;
  bottom: calc(100% + 10px);
  display: flex;
  align-items: center;
`;

const BottomButtonArea = styled.div`
  position: absolute;
  left: 10px;
  top: calc(100% + 10px);
`;

const springOptions = {
  damping: 15,
  stiffness: 180,
  mass: 2
};

const linkButton = { as: motion.a, target: "_blank" };

const StatsInterface = () => {
  const { github } = useContext(AppContext);
  const { scrollY } = useViewportScroll();
  const [ref, { height = 0, width = 0, y = 0 }] = useDimensions();
  const yOffset = y + window.pageYOffset;
  const [hasAnimated, setHasAnimated] = useState(false);

  const cursorX = useSpring(0, springOptions);
  const cursorY = useSpring(0, springOptions);

  const opacity = useTransform(
    scrollY,
    [
      yOffset - height * 0.9,
      yOffset - height * 0.4,
      yOffset + height * 0.4,
      yOffset + height * 0.8
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollY,
    [yOffset - height * 0.9, yOffset - height * 0.4],
    [0.9, 1]
  );

  const rotateX = useTransform(cursorY, [height * 0.2, height * 0.8], [-5, 5]);
  const rotateY = useTransform(cursorX, [width * 0.2, width * 0.8], [6, -6]);

  const leftSquareZ = useTransform(cursorX, [width * 0.4, width], [5, 80]);
  const rightSquareZ = useTransform(cursorY, [height, 0], [-10, -100]);

  const wrapStyles = hasAnimated ? { opacity, scale } : {};

  useEffect(() => {
    cursorX.set(width / 2);
    cursorY.set(height / 2);
  }, [cursorX, cursorY, height, width]);

  return (
    <AnimatePresence exitBeforeEnter>
      {github.isLoading ? (
        <OuterWrap key="loading">
          <LoadingIndicator />
        </OuterWrap>
      ) : (
        <OuterWrap
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onAnimationComplete={() => setHasAnimated(true)}
          style={wrapStyles}
          onMouseMove={(e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
          }}
          onMouseLeave={() => {
            cursorX.set(width / 2);
            cursorY.set(height / 2);
          }}
        >
          <InnerContainer as={motion.div}>
            <ModuleWrap
              initial={{ z: 50 }}
              animate={{ z: 0 }}
              style={{ rotateX, rotateY }}
            >
              <IssuesSquare
                issues={github.recentIssues}
                style={{ z: leftSquareZ, x: "-22.5%", y: "-80%" }}
              />

              <TopButtonArea>
                <Button {...linkButton} icon="githubLogo" href={urls.REPO}>
                  wombak/www
                </Button>
                <Button {...linkButton} icon="browser" href={urls.WOMBAK}>
                  wombak.xyz
                </Button>
              </TopButtonArea>

              <ModuleBg>
                <BgCutout />
                <ProgressBar
                  completeIssues={github.closedIssueCount}
                  totalIssues={github?.totalIssueCount}
                />
              </ModuleBg>

              <MetaSquare
                style={{ z: rightSquareZ, x: "22.5%", y: "80%" }}
                commits={github?.commitCount}
                stars={github?.stars}
                watching={github?.subscribers}
              />

              <BottomButtonArea>
                <Button {...linkButton} icon="project" href={urls.KANBAN}>
                  Kanban board
                </Button>
              </BottomButtonArea>
            </ModuleWrap>
          </InnerContainer>
        </OuterWrap>
      )}
    </AnimatePresence>
  );
};

export default StatsInterface;
